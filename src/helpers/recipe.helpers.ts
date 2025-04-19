/* eslint-disable sonarjs/pseudo-random */
import { getDatabase, push, ref, remove, update } from 'firebase/database';
import { deleteObject, getStorage, ref as storageRef } from 'firebase/storage';
import {
  Recipe,
  RecipeFormData,
  RecipeIngredient,
  RecipeIngredientWithId,
  Recipes,
  RecipeWithId,
} from '../types/recipe';
import { ShoppingListRecipeWithId } from '../types/shoppingList';
import { strContains } from '../utils/utils';
import { generateKey } from './firebase.helpers';
import {
  mergeDuplicateIngredients,
  orderIngredientsByDetailsId,
} from './ingredient.helpers';

export const getRecipeBySlug = (
  slug: string,
  recipes: Recipes,
): RecipeWithId | null => {
  if (!recipes) return null;

  const recipeKey = Object.keys(recipes).find(
    key => recipes[key]?.slug === slug,
  );

  // no match, the list doesn't exist
  if (!recipeKey) return null;

  const matchingRecipe = recipes[recipeKey];

  // matching recipe
  if (!matchingRecipe) return null;

  return {
    ...matchingRecipe,
    id: recipeKey,
  };
};

export const getRecipesByCategory = (
  recipes: Recipes,
  categoryId: string,
): Recipes | null => {
  const recipesWithCategory: Recipes = {};

  Object.keys(recipes)
    .filter(key => recipes[key]?.categoryId === categoryId)
    .forEach(key => {
      const recipe = recipes[key];
      if (recipe) recipesWithCategory[key] = recipe;
    });

  const noMatch = Object.keys(recipesWithCategory).length === 0;

  return noMatch ? null : recipesWithCategory;
};

export const recipeUses = (
  recipe: Recipe,
  id: string,
  property: keyof RecipeIngredient,
) => {
  const ingredients = recipe.ingredients;

  return Object.keys(ingredients).some(key => {
    const ingredient = ingredients[key];
    if (!ingredient) return false;
    return ingredient[property] === id;
  });
};

export const removeValuefromRecipeIngredients = (
  recipe: Recipe,
  property: keyof RecipeIngredient,
  id: string,
) => {
  const updatedRecipe: Recipe = { ...recipe };
  const updatedIngredients = { ...recipe.ingredients };

  Object.keys(updatedIngredients).forEach(key => {
    const ingredient = updatedIngredients[key];
    if (!ingredient) return;

    if (ingredient[property] === id) {
      delete updatedIngredients[key];
    }
  });

  updatedRecipe.ingredients = { ...updatedIngredients };

  return updatedRecipe;
};

/**
 * Reverse the order of the recipes
 */
export const reverseRecipes = (recipes: Recipes): Recipes => {
  const reversedObject: Recipes = {};

  Object.keys(recipes)
    .reverse()
    .forEach(key => {
      const object = recipes[key];

      if (object) {
        reversedObject[key] = object;
      }
    });

  return reversedObject;
};

// randomize the order of recipes
export const shuffleRecipes = (recipes: Recipes): Recipes => {
  const shuffledRecipes: Recipes = {};

  Object.keys(recipes)
    .map(recipeKey => ({ recipeKey, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ recipeKey }) => recipeKey)
    .forEach(recipeKey => {
      const recipe = recipes[recipeKey];

      if (recipe) {
        shuffledRecipes[recipeKey] = recipe;
      }
    });

  return shuffledRecipes;
};

export const searchMatchingRecipes = (
  search: string,
  recipes: Recipes,
): Recipes | null => {
  const matchingRecipes: Recipes = {};

  Object.keys(recipes).forEach(key => {
    const recipe = recipes[key];
    if (!recipe) return;
    if (strContains(recipe.title, search)) {
      matchingRecipes[key] = recipe;
    }
  });

  const noMatch = Object.keys(matchingRecipes).length === 0;

  return noMatch ? null : matchingRecipes;
};

/* firebase */

export const deleteRecipe = async (recipe: RecipeWithId) => {
  // if the recipe has an image we delete it
  if (recipe.imageName) {
    const storage = getStorage();
    const imageRef = storageRef(storage, `recipe-images/${recipe.imageName}`);

    await deleteObject(imageRef);
  }

  const db = getDatabase();
  const recipeRef = ref(db, `recipes/${recipe.id}`);
  return remove(recipeRef);
};

export const updateRecipe = (
  recipe: RecipeWithId,
  recipeFormData: RecipeFormData,
) => {
  const db = getDatabase();
  const recipeRef = ref(db, `recipes/${recipe.id}`);
  return update(recipeRef, recipeFormData);
};

export const createRecipe = (recipeFormData: RecipeFormData) => {
  const db = getDatabase();
  const recipesRef = ref(db, 'recipes');
  return push(recipesRef, recipeFormData);
};

export const generateRecipeKey = () => {
  const path = 'recipes';
  return generateKey(path);
};

export const getServingRatio = (
  numberOfServings: number,
  recipeServings?: string,
) => {
  if (!recipeServings) {
    return undefined;
  }

  return numberOfServings / Number(recipeServings);
};

export const getCookTimeText = (cookTimeInMins: number) => {
  if (cookTimeInMins < 60) {
    return `${cookTimeInMins}min`;
  }

  const minutes = cookTimeInMins % 60;
  const hours = (cookTimeInMins - minutes) / 60;
  const minutesText = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}h${minutesText}`;
};

// returns the list of ingredients of all recipes in a given array
// merge the duplicate ingredients
export const getIngredientList = (recipes: ShoppingListRecipeWithId[]) => {
  const allIngredients: RecipeIngredientWithId[] = [];

  recipes.forEach(recipe => {
    const recipeIngredients: RecipeIngredientWithId[] = [];
    Object.keys(recipe.ingredients).forEach(key => {
      const ingredient = recipe.ingredients[key];
      if (!ingredient) return;
      let quantity: boolean | number = false;
      if (ingredient.quantity) {
        const servingRatio = getServingRatio(
          recipe.shoppingListServingsNb,
          recipe.nbServings,
        );
        if (!servingRatio) return;
        quantity = ingredient.quantity * servingRatio;
      }
      recipeIngredients.push({ ...ingredient, quantity, id: key });
    });
    allIngredients.push(...recipeIngredients);
  });
  const mergedIngredients = mergeDuplicateIngredients(allIngredients);
  return orderIngredientsByDetailsId(mergedIngredients);
};

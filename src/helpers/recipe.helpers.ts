import { getDatabase, ref, remove, update, push } from 'firebase/database';
import { ref as storageRef, getStorage, deleteObject } from 'firebase/storage';
import { Recipe, RecipeFormData, RecipeIngredient, Recipes, RecipeWithId } from '../types/recipe';
import { strContains } from '../utils';
import { generateKey } from './firebase.helpers';

export const getRecipeBySlug = (slug: string, recipes: Recipes): RecipeWithId | null => {
  if (!recipes) return null;

  const recipeKey = Object
    .keys(recipes)
    .find(key => recipes[key]?.slug === slug);

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

export const getRecipesByCategory = (recipes: Recipes, categoryId: string): Recipes | null => {
  const recipesWithCategory: Recipes = {};

  Object
    .keys(recipes)
    .filter(key => recipes[key]?.categoryId === categoryId)
    .forEach(key => {
      const recipe = recipes[key];
      if (recipe) recipesWithCategory[key] = recipe;
    });

  const noMatch = Object.keys(recipesWithCategory).length === 0;

  return noMatch ? null : recipesWithCategory;
};

export const recipeUses = (recipe: Recipe, id: string, property: keyof RecipeIngredient) => {
  const ingredients = recipe.ingredients;

  if (typeof ingredients === 'string') {
    return false;
  }

  return Object
    .keys(ingredients)
    .some(key => {
      const ingredient = ingredients[key];
      if (!ingredient) return false;
      return ingredient[property] === id;
    });
};

export const removeValuefromRecipeIngredients = (
  recipe: Recipe, property: keyof RecipeIngredient, id: string,
) => {
  if (typeof recipe.ingredients === 'string') {
    return recipe;
  }

  const updatedRecipe: Recipe = { ...recipe };
  const updatedIngredients = { ...recipe.ingredients };

  Object
    .keys(updatedIngredients)
    .forEach(key => {
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

  Object
    .keys(recipes)
    .reverse()
    .forEach(key => {
      const object = recipes[key];

      if (object) {
        reversedObject[key] = object;
      }
    });

  return reversedObject;
};

export const searchMatchingRecipes = (search: string, recipes: Recipes): Recipes | null => {
  const matchingRecipes: Recipes = {};

  Object
    .keys(recipes)
    .forEach(key => {
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

export const updateRecipe = (recipe: RecipeWithId, recipeFormData: RecipeFormData) => {
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

export const getServingRatio = (numberOfServings: number, recipeServings?: string) => {
  if (!recipeServings) {
    return null;
  }

  return numberOfServings / Number(recipeServings);
};

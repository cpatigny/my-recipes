import {
  getDatabase, push, set, ref, remove, update,
} from 'firebase/database';
import { IngredientDetails, IngredientDetailsWithId } from '../../types/ingredientDetails';
import { Recipes } from '../../types/recipe';
import recipeUsesIngredientDetails from '../recipes/recipeUsesIngredientDetails';
import removeIngredientDetailsFromRecipe from '../recipes/removeIngredientDetailsFromRecipe';

export const createIngredientDetails = (ingredientDetails: IngredientDetails) => {
  const db = getDatabase();
  const ingredientsDetailsRef = ref(db, 'ingredients');
  return push(ingredientsDetailsRef, ingredientDetails);
};

export const updateIngredientDetails = (ingredient: IngredientDetailsWithId) => {
  const db = getDatabase();
  const ingredientDetailsRef = ref(db, `ingredients/${ingredient.id}`);
  return set(ingredientDetailsRef, ingredient);
};

export const deleteIngredientDetails = async (ingredientDetailsId: string, recipes: Recipes) => {
  const db = getDatabase();

  // remove the ingredient from all recipes that have it
  const recipesToUpdate: Recipes = {};

  Object
    .keys(recipes)
    .filter(key => {
      const recipe = recipes[key];
      if (!recipe || typeof recipe === 'string') {
        return false;
      }

      return recipeUsesIngredientDetails(ingredientDetailsId, recipe);
    })
    .forEach(key => {
      const recipe = recipes[key];
      if (!recipe) return;

      const updatedRecipe = removeIngredientDetailsFromRecipe(recipe, ingredientDetailsId);
      recipesToUpdate[key] = updatedRecipe;
    });

  const recipesRef = ref(db, 'recipes');
  await update(recipesRef, recipesToUpdate);

  const ingredientRef = ref(db, `ingredients/${ingredientDetailsId}`);
  return remove(ingredientRef);
};

import {
  getDatabase, push, set, ref,
} from 'firebase/database';
import { Ingredient, IngredientWithId } from '../../types/ingredient';

export const createIngredient = (ingredient: Ingredient) => {
  const db = getDatabase();
  const ingredientsRef = ref(db, 'ingredients');
  return push(ingredientsRef, ingredient);
};

export const updateIngredient = (ingredient: IngredientWithId) => {
  const db = getDatabase();
  const ingredientRef = ref(db, `ingredients/${ingredient.id}`);
  return set(ingredientRef, ingredient);
};

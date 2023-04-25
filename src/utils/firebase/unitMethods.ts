import { getDatabase, ref, push, set, remove, update } from 'firebase/database';
import { Unit, UnitWithId } from '../../types/unit';
import { Recipes } from '../../types/recipe';
import removeValuefromRecipeIngredients from '../recipes/removeValuefromRecipeIngredients';
import recipeUses from '../recipes/recipeUses';

export const createUnit = (unit: Unit) => {
  const db = getDatabase();
  const unitsRef = ref(db, 'units');
  return push(unitsRef, unit);
};

export const updateUnit = (unit: UnitWithId) => {
  const db = getDatabase();
  const unitRef = ref(db, `units/${unit.id}`);
  return set(unitRef, unit);
};

export const deleteUnit = async (unitId: string, recipes: Recipes) => {
  const db = getDatabase();
  const recipesToUpdate: Recipes = {};

  Object
    .keys(recipes)
    .forEach(key => {
      const recipe = recipes[key];
      if (!recipe) return;
      if (recipeUses(recipe, unitId, 'unitId')) {
        const updatedRecipe = removeValuefromRecipeIngredients(recipe, 'unitId', unitId);
        recipesToUpdate[key] = updatedRecipe;
      }
    });

  const recipesRef = ref(db, 'recipes');
  await update(recipesRef, recipesToUpdate);

  const ingredientRef = ref(db, `units/${unitId}`);
  return remove(ingredientRef);
};

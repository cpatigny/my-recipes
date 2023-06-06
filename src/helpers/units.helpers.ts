import { getDatabase, ref, push, set, update, remove } from 'firebase/database';
import { RecipeIngredient, Recipes } from '../types/recipe';
import { Units, UnitWithId, Unit } from '../types/unit';
import { strContains } from '../utils/utils';
import { recipeUses, removeValuefromRecipeIngredients } from './recipe.helpers';

export const getMatchingUnits = (search: string, units: Units | null) => {
  if (!units) {
    return [];
  }

  const matchingUnits: UnitWithId[] = [];

  Object
    .keys(units)
    .forEach(key => {
      const unit = units[key];
      if (!unit) return;
      const singularContainsSearch = strContains(unit.singular, search);
      const pluralContainsSearch = strContains(unit.plural, search);

      let unitMatchesSearch = false;
      if (unit.symbol) {
        unitMatchesSearch = strContains(unit.symbol, search);
      }

      if (singularContainsSearch || pluralContainsSearch || unitMatchesSearch) {
        matchingUnits.push({ id: key, ...unit });
      }
    });

  return matchingUnits;
};

/**
 * returns a unit object which properties all have a defined value
 * it'll return the default unit if no unitId is passed
 */
export const getUnitDetails = (units: Units | null, unitId?: RecipeIngredient['unitId']) => {
  const defaultUnit: Unit = {
    singular: '',
    plural: '',
    symbol: false,
  };

  if (!units || !unitId) {
    return defaultUnit;
  }

  const unit = units[unitId];

  if (!unit) {
    return defaultUnit;
  }

  return unit;
};

export const getUnitName = (unit: Unit, quantity: number) => {
  if (unit.symbol) {
    return unit.symbol;
  }

  if (quantity >= 2) {
    return unit.plural;
  }

  return unit.singular;
};

/* firebase */

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

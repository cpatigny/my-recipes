import { IngredientsDetails } from '../types/ingredientDetails';
import { GroupWithId, RecipeIngredient, RecipeIngredientWithId, RecipeIngredients } from '../types/recipe';
import { lastCharIs } from '../utils/utils';
import { generateKey } from './firebase.helpers';
import { sortItemsByPosition } from './helpers';

export const addGroupIdToIngredients = (
  groupId: string, ingredientsId: string[], ingredients: RecipeIngredients,
) => {
  const groupedIngredients: RecipeIngredients = {};

  ingredientsId.forEach(id => {
    const ingredient = ingredients[id];
    if (!ingredient) return;
    groupedIngredients[id] = {
      ...ingredient,
      groupId,
    };
  });

  return groupedIngredients;
};

export const convertIngredientsArrayToObject = (ingredients: RecipeIngredientWithId[]) => {
  const ingredientsObject: RecipeIngredients = {};

  ingredients.forEach(i => {
    const { id, ...ingredient } = i;
    ingredientsObject[id] = ingredient;
  });

  return ingredientsObject;
};

export const convertIngredientsObjectToArray = (ingredients: RecipeIngredients) => {
  const ingredientsArray: RecipeIngredientWithId[] = [];

  Object
    .keys(ingredients)
    .forEach(key => {
      const ingredient = ingredients[key];
      if (!ingredient) return;
      ingredientsArray.push({ id: key, ...ingredient });
    });

  return ingredientsArray;
};

export const getIngredientsByGroup = (groupId: string, ingredients: RecipeIngredients) => {
  const matchingIngredients: RecipeIngredientWithId[] = [];

  Object
    .keys(ingredients)
    .filter(key => ingredients[key]?.groupId === groupId)
    .forEach(key => {
      const ingredient = ingredients[key];
      if (!ingredient) return;
      matchingIngredients.push({ id: key, ...ingredient });
    });

  return matchingIngredients;
};

/**
 * @param group the group the user is editing but not yet updated
 * @param selectedIngredientsId the list of ingredients id the user selected (checked)
 * @param ingredients the list of all ingredients from the recipe
 * @returns the list of ingredients that got removed from a group
 */
export const getExcludedIngredients = (
  group: GroupWithId, selectedIngredientsId: string[], ingredients: RecipeIngredients,
) => {
  const excludedIngredients: RecipeIngredients = {};
  const groupIngredients = getIngredientsByGroup(group.id, ingredients);

  groupIngredients
    .filter(ingredient => !selectedIngredientsId.includes(ingredient.id))
    .forEach(ingredient => {
      const { id, ...ingredientData } = ingredient;
      excludedIngredients[id] = ingredientData;
    });

  return excludedIngredients;
};

export const getIngredientName = (
  ingredient: RecipeIngredientWithId | RecipeIngredient,
  quantity: number,
  ingredientsDetails: IngredientsDetails | null,
) => {
  if (!ingredientsDetails) return '';

  const details = ingredientsDetails[ingredient.detailsId];
  if (!details) return '';

  if (details.plural && quantity >= 2) {
    return details.plural;
  }

  return details.name;
};

export const getIngredientsWithoutGroup = (ingredients: RecipeIngredients) => {
  const ingredientsWithoutGroup: RecipeIngredientWithId[] = [];

  Object
    .keys(ingredients)
    .filter(key => typeof ingredients[key]?.groupId !== 'string')
    .forEach(key => {
      const ingredient = ingredients[key];
      if (!ingredient) return;
      ingredientsWithoutGroup.push({ ...ingredient, id: key });
    });

  return sortItemsByPosition(ingredientsWithoutGroup);
};

export const removeGroupId = (ingredients: RecipeIngredients) => {
  const updatedIngredients: RecipeIngredients = {};

  Object
    .keys(ingredients)
    .forEach(key => {
      const ingredient = ingredients[key];
      if (!ingredient) return;
      updatedIngredients[key] = { ...ingredient, groupId: false };
    });

  return updatedIngredients;
};

export const generateIngredientKey = (recipeId: string) => {
  const path = `recipes/${recipeId}/groups`;
  return generateKey(path);
};

export const roundQuantity = (quantity: number) => {
  if (quantity >= 100) {
    // round to nearest 5
    return Math.round(quantity / 5) * 5;
  }

  if (quantity >= 10) {
    // round to nearest integer
    return Math.round(quantity);
  }

  // round to nearest decimal
  return Math.round(quantity * 10) / 10;
};

export const getQuantityText = (quantity: number) => {
  if (!quantity) return '';

  // we do it before rounding because 0.25 will always be rounded to 0.3
  if (quantity === 0.25) {
    return '1/4';
  }

  const roundedQuantity = roundQuantity(quantity);

  let quantityText = roundedQuantity.toString();

  if (roundedQuantity === 0.5) {
    quantityText = '1/2';
  }

  return quantityText;
};

export const getPrepositionText = (preposition: string | false) => {
  let prepositionText = '';

  if (preposition) {
    prepositionText = preposition;
  }

  if (!lastCharIs(prepositionText, `'`)) {
    prepositionText = `${prepositionText} `; // add space
  }

  return prepositionText;
};

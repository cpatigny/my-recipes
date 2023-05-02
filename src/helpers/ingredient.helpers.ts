import { IngredientsDetails } from '../types/ingredientDetails';
import { GroupWithId, RecipeIngredient, RecipeIngredientWithId, RecipeIngredients } from '../types/recipe';
import { generateKey } from './firebase.helpers';

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
 * @param ingredients the list of all ingredients
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
  ingredientsDetails: IngredientsDetails | null,
) => {
  if (!ingredientsDetails) return '';

  const details = ingredientsDetails[ingredient.detailsId];
  if (!details) return '';

  const quantity = ingredient.quantity;
  if (quantity && quantity > 1) {
    return details.plural;
  }

  return details.singular;
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

  return ingredientsWithoutGroup;
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

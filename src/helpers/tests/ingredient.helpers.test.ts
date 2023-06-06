import { getMockCategories } from '../../tests-utils/mocks/categories.mock';
import { getMockIngredientsDetails } from '../../tests-utils/mocks/ingredientsDetails.mock';
import { getMockRecipeIngredientsWithId, getOneMockRecipe } from '../../tests-utils/mocks/recipes.mock';
import { getMockUnits } from '../../tests-utils/mocks/units.mock';
import { addGroupIdToIngredients, convertIngredientsArrayToObject, convertIngredientsObjectToArray, getIngredientsByGroup } from '../ingredient.helpers';

const categories = getMockCategories();
const ingredientsDetails = getMockIngredientsDetails();
const units = getMockUnits();

const categoriesIds = Object.keys(categories);
const ingredientsDetailsIds = Object.keys(ingredientsDetails);
const unitsIds = Object.keys(units);

const idList = {
  categoriesIds,
  ingredientsDetailsIds,
  unitsIds,
};

describe('addGroupIdToIngredients', () => {
  test('should add the given groupId to all ingredients', () => {
    const ingredients = getOneMockRecipe(idList).ingredients;
    const ingredientsIds = Object.keys(ingredients);
    const groupId = 'group-123456';
    const groupedIngredients = addGroupIdToIngredients(groupId, ingredientsIds, ingredients);
    const allIngredientsHaveNewGroupId = Object
      .keys(groupedIngredients)
      .every(key => {
        const ing = groupedIngredients[key];
        if (!ing) return false;
        return ing.groupId === groupId;
      });
    expect(allIngredientsHaveNewGroupId).toBe(true);
  });
});

describe('convertIngredientsArrayToObject', () => {
  test('should return an object', () => {
    const ingredientsWithId = getMockRecipeIngredientsWithId(idList);
    const convertedItems = convertIngredientsArrayToObject(ingredientsWithId);
    const isObject = (item: unknown) => typeof item === 'object' && !Array.isArray(item) && item !== null;
    expect(isObject(convertedItems)).toBe(true);
  });
});

describe('convertIngredientsObjectToArray', () => {
  test('should return an array', () => {
    const ingredients = getOneMockRecipe(idList).ingredients;
    const convertedItems = convertIngredientsObjectToArray(ingredients);
    expect(Array.isArray(convertedItems)).toBe(true);
  });
});

describe('getIngredientsByGroup', () => {
  test('should return an array of ingredients', () => {
    const ingredients = getOneMockRecipe(idList, true).ingredients;
    const ingredientsByGroup = getIngredientsByGroup('whatever', ingredients);
    expect(Array.isArray(ingredientsByGroup)).toBe(true);
  });

  test('should only return ingredients with the given groupId', () => {
    const ingredients = getOneMockRecipe(idList, true).ingredients;
    const key = Object.keys(ingredients)[0];
    const item = key ? ingredients[key] : null;
    if (!item) return;
    const groupId = item.groupId;

    if (!groupId) {
      throw new Error('Ingredient item must have a groupId in order for the test to work');
    }

    const ingredientsByGroup = getIngredientsByGroup(groupId, ingredients);
    expect(ingredientsByGroup.every(i => i.groupId === groupId)).toBe(true);
  });
});

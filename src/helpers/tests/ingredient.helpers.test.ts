import { getMockCategories } from '../../tests-utils/mocks/categories.mock';
import { getMockIngredientsDetails } from '../../tests-utils/mocks/ingredientsDetails.mock';
import {
  getMockRecipeIngredientsWithId,
  getOneMockRecipe,
} from '../../tests-utils/mocks/recipes.mock';
import { getMockUnits } from '../../tests-utils/mocks/units.mock';
import { IngredientDetails } from '../../types/ingredientDetails';
import { RecipeIngredient } from '../../types/recipe';
import {
  addGroupIdToIngredients,
  convertIngredientsArrayToObject,
  convertIngredientsObjectToArray,
  getIngredientName,
  getIngredientsByGroup,
  getIngredientsWithoutGroup,
  getPrepositionText,
  getQuantityText,
  removeGroupId,
  roundQuantity,
} from '../ingredient.helpers';

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
    const groupedIngredients = addGroupIdToIngredients(
      groupId,
      ingredientsIds,
      ingredients,
    );
    const allIngredientsHaveNewGroupId = Object.keys(groupedIngredients).every(
      key => {
        const ing = groupedIngredients[key];
        if (!ing) return false;
        return ing.groupId === groupId;
      },
    );
    expect(allIngredientsHaveNewGroupId).toBe(true);
  });
});

describe('convertIngredientsArrayToObject', () => {
  test('should return an object', () => {
    const ingredientsWithId = getMockRecipeIngredientsWithId(idList);
    const convertedItems = convertIngredientsArrayToObject(ingredientsWithId);
    const isObject = (item: unknown) =>
      typeof item === 'object' && !Array.isArray(item) && item !== null;
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
    const ingredients = getOneMockRecipe(idList, 10, true).ingredients;
    const ingredientsByGroup = getIngredientsByGroup('whatever', ingredients);
    expect(Array.isArray(ingredientsByGroup)).toBe(true);
  });

  test('should only return ingredients with the given groupId', () => {
    const ingredients = getOneMockRecipe(idList, 10, true).ingredients;
    const key = Object.keys(ingredients)[0];
    const item = key ? ingredients[key] : null;
    if (!item) return;
    const groupId = item.groupId;

    if (!groupId) {
      throw new Error(
        'Ingredient item must have a groupId in order for the test to work',
      );
    }

    const ingredientsByGroup = getIngredientsByGroup(groupId, ingredients);
    expect(ingredientsByGroup.every(i => i.groupId === groupId)).toBe(true);
  });
});

describe('getIngredientName', () => {
  const ingredients = getOneMockRecipe(idList).ingredients;
  const key = Object.keys(ingredients)[0];
  const ingredient = key ? ingredients[key] : null;
  if (!ingredient) return;

  test('should return an empty string if ingredient details is null', () => {
    const name = getIngredientName(ingredient, 1, null);
    expect(name).toBe('');
  });

  test("should return an empty string if ingredient detailsId doesn't match", () => {
    const name = getIngredientName(
      { ...ingredient, detailsId: 'azerty123456' },
      1,
      null,
    );
    expect(name).toBe('');
  });

  test('should always return name if ingredient has no plural', () => {
    const detailsId = '123';

    // we create an ingredient details without plural
    const noPluralIngredientDetails: IngredientDetails = {
      name: 'sugar',
    };

    // we create a key value object with the previous ingredient details
    const ingredientsDetailsWithoutPlural = {
      [detailsId]: noPluralIngredientDetails,
    };

    // we create a recipe ingredient that uses the previously created ingredient details
    const recipeIngredient: RecipeIngredient = { ...ingredient, detailsId };

    const nameOne = getIngredientName(
      recipeIngredient,
      1,
      ingredientsDetailsWithoutPlural,
    );
    const nameTwo = getIngredientName(
      recipeIngredient,
      2,
      ingredientsDetailsWithoutPlural,
    );

    expect(nameOne).toBe(noPluralIngredientDetails.name);
    expect(nameTwo).toBe(noPluralIngredientDetails.name);
  });

  test('should return plural if quantity is greater than or equal to 2 and plural is defined', () => {
    const name = getIngredientName(ingredient, 2, ingredientsDetails);
    expect(name).toBe(ingredientsDetails[ingredient.detailsId]?.plural);
  });

  test('should return name if quantity is lesser than 2', () => {
    const name = getIngredientName(ingredient, 1, ingredientsDetails);
    expect(name).toBe(ingredientsDetails[ingredient.detailsId]?.name);
  });
});

describe('removeGroupId', () => {
  test('should return ingredients with groupId removed', () => {
    const ingredients = getOneMockRecipe(idList, 200).ingredients;
    const groupIdRemovedIngredients = removeGroupId(ingredients);
    const noGroupId = Object.keys(groupIdRemovedIngredients).every(key => {
      const ing = groupIdRemovedIngredients[key];
      if (!ing) return false;
      return ing.groupId === false;
    });
    expect(noGroupId).toBe(true);
  });
});

describe('getIngredientsWithoutGroup', () => {
  test('should return only ingredients that do not have a groupId', () => {
    const ingredients = getOneMockRecipe(idList, 50).ingredients;
    const key = Object.keys(ingredients)[0];
    if (!key) return;
    const ingredient = ingredients[key];
    if (!ingredient) return;
    const ingredientWithoutGroup = removeGroupId({ [key]: ingredient });
    const updatedIngredients = { ...ingredients, ...ingredientWithoutGroup };
    const ingsWithoutGroup = getIngredientsWithoutGroup(updatedIngredients);
    expect(ingsWithoutGroup.every(i => i.groupId === false)).toBe(true);
  });
});

describe('roundQuantity', () => {
  test('should round quantity to nearest 5 if quantity is greater than or equal to 100', () => {
    expect(roundQuantity(152)).toBe(150);
  });

  test('should round quantity to nearest integer if quantity is greater than or equal to 10', () => {
    expect(roundQuantity(15.8)).toBe(16);
  });

  test('should round quantity to nearest decimal if quantity is lesser than 10', () => {
    expect(roundQuantity(5.8165)).toBe(5.8);
  });
});

describe('getQuantityText', () => {
  test('should return an empty string if quantity is equal to 0', () => {
    expect(getQuantityText(0)).toBe('');
  });

  test('should return rounded quantity string', () => {
    expect(getQuantityText(152)).toBe('150');
  });

  test('should return 1/2 if quantity is rounded to 0.5', () => {
    expect(getQuantityText(0.5)).toBe('1/2');
    expect(getQuantityText(0.52)).toBe('1/2');
  });

  test('should return 1/4 if quantity is rounded to 0.25', () => {
    expect(getQuantityText(0.25)).toBe('1/4');
  });
});

describe('getPrepositionText', () => {
  test('should return an emtpy string if preposition is false', () => {
    expect(getPrepositionText(false)).toBe(' ');
  });

  test('should return the string without spaces at the end if no apostrophe', () => {
    expect(getPrepositionText('it')).toBe('it ');
  });

  test('should return string with space at the end if apostrophe', () => {
    expect(getPrepositionText(`it'`)).toBe(`it'`);
  });
});

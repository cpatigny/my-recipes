import { faker } from '@faker-js/faker';
import { getMockRecipes } from '../../tests-utils/mocks/recipes.mock';
import {
  getCookTimeText,
  getRecipeBySlug,
  searchMatchingRecipes,
} from '../recipe.helpers';

describe('getRecipeBySlug', () => {
  test('should return the matching recipe', () => {
    const recipes = getMockRecipes(15);
    const recipeKey = Object.keys(recipes)[3];

    if (!recipeKey) return;

    const recipe = recipes[recipeKey];
    if (!recipe) return;

    const matchingRecipe = getRecipeBySlug(recipe.slug, recipes);
    if (!matchingRecipe) {
      throw new Error('Expected matching recipe but got null instead');
    }

    expect(matchingRecipe.id).toBe(recipeKey);
  });

  test('should return null if no matching recipe', () => {
    const recipes = getMockRecipes(10);
    const matchingRecipe = getRecipeBySlug('123456789', recipes);
    expect(matchingRecipe).toBeNull();
  });
});

describe('searchMatchingRecipes', () => {
  test('should return matching recipes', () => {
    const recipes = getMockRecipes(30);
    const recipeKey = Object.keys(recipes)[5];

    if (!recipeKey) return;

    const recipe = recipes[recipeKey];
    if (!recipe) return;

    const matchingRecipes = searchMatchingRecipes(recipe.title, recipes);
    if (!matchingRecipes) {
      throw new Error('Expected at least 1 matching recipe but got 0');
    }

    expect(Object.keys(matchingRecipes).length).toBeGreaterThanOrEqual(1);
  });

  test('should return null if no matching recipes', () => {
    const recipes = getMockRecipes(30);
    const random = faker.string.nanoid();
    const matchingRecipes = searchMatchingRecipes(random, recipes);
    expect(matchingRecipes).toBeNull();
  });
});

describe('getCookTimeText', () => {
  test('should return correct text', () => {
    expect(getCookTimeText(75)).toBe('1h15');
  });

  test('should only return minutes if hours is not needed', () => {
    expect(getCookTimeText(10)).toBe('10min');
  });

  test('should return minutes with two digits when hour number is present', () => {
    expect(getCookTimeText(65)).toBe('1h05');
  });
});

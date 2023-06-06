import { getOneMockCategoryWithId } from '../../tests-utils/mocks/categories.mock';
import { getMockIngredientsDetails } from '../../tests-utils/mocks/ingredientsDetails.mock';
import { getOneMockRecipe } from '../../tests-utils/mocks/recipes.mock';
import { getMockUnits } from '../../tests-utils/mocks/units.mock';
import { Recipes } from '../../types/recipe';
import { countRecipesByCategory } from '../category.helpers';

describe('countRecipesByCategory', () => {
  test('should return the correct number', () => {
    const nbRecipesWithCategory = 5;
    const category = getOneMockCategoryWithId();
    const ingredientsDetails = getMockIngredientsDetails();
    const units = getMockUnits();
    const recipesWithCategory: Recipes = {};

    for (let i = 0; i < nbRecipesWithCategory; i++) {
      recipesWithCategory[`recipe${i}`] = getOneMockRecipe({
        categoriesIds: [category.id],
        ingredientsDetailsIds: Object.keys(ingredientsDetails),
        unitsIds: Object.keys(units),
      });
    }

    const count = countRecipesByCategory(recipesWithCategory, category.id);
    expect(count).toBe(nbRecipesWithCategory);
  });
});

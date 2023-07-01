import { getDatabase, ref, onValue, get } from 'firebase/database';
import { signInWithMockedAdmin } from '../../tests-utils/mocks/auth.mock';
import { getOneMockCategory, getOneMockCategoryWithId } from '../../tests-utils/mocks/categories.mock';
import { getMockIngredientsDetails } from '../../tests-utils/mocks/ingredientsDetails.mock';
import { getOneMockRecipe } from '../../tests-utils/mocks/recipes.mock';
import { getMockUnits } from '../../tests-utils/mocks/units.mock';
import { RecipeFormData, Recipes } from '../../types/recipe';
import { countRecipesByCategory, createCategory, deleteCategory, updateCategory } from '../category.helpers';
import { createRecipe, deleteRecipe } from '../recipe.helpers';

let recipes: Recipes = {};
const db = getDatabase();
const recipesRef = ref(db, 'recipes');

onValue(recipesRef, snapshot => {
  recipes = snapshot.val();
});

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

test('createCategory should create a new category', async () => {
  await signInWithMockedAdmin();
  const newCategory = getOneMockCategory();
  const newCategoryRef = await createCategory(newCategory);
  const newCategoryKey = newCategoryRef.key;
  expect(newCategoryKey).toBeTruthy();

  // clean up added category
  if (newCategoryKey) {
    await deleteCategory({ recipes, category: { ...newCategory, id: newCategoryKey } });
  }
});

describe('deleteCategory', () => {
  test('should delete the category', async () => {
    await signInWithMockedAdmin();
    const newCategory = getOneMockCategory();
    const newCategoryRef = await createCategory(newCategory);
    const newCategoryKey = newCategoryRef.key;
    if (newCategoryKey) {
      await deleteCategory({ recipes, category: { ...newCategory, id: newCategoryKey } });
    }
    const snapshot = await get(newCategoryRef);
    expect(snapshot.exists()).toBe(false);
  });

  test('should remove the category from recipes', async () => {
    // create a new category
    await signInWithMockedAdmin();
    const newCategory = getOneMockCategory();
    const newCategoryRef = await createCategory(newCategory);
    const newCategoryKey = newCategoryRef.key;

    if (!newCategoryKey) {
      throw new Error('Expected newCategoryKey to be a string but got null instead');
    }

    // create a recipe with the new category
    const ingredientsDetails = getMockIngredientsDetails();
    const units = getMockUnits();
    const recipeWithCategory = getOneMockRecipe({
      categoriesIds: [newCategoryKey],
      ingredientsDetailsIds: Object.keys(ingredientsDetails),
      unitsIds: Object.keys(units),
    }) as RecipeFormData;

    const newRecipeRef = await createRecipe(recipeWithCategory);
    const newRecipeKey = newRecipeRef.key;
    if (!newRecipeKey) {
      throw new Error('Expected newRecipeKey to be a string but got null instead');
    }

    await deleteCategory({ recipes, category: { ...newCategory, id: newCategoryKey } });
    const snapshot = await get(newRecipeRef);
    const newRecipe = snapshot.val();

    expect(newRecipe.categoryId).toBe(false);

    // clean up added recipe
    await deleteRecipe({ ...newRecipe, id: newRecipeKey });
  });
});

test('updateCategory should update category', async () => {
  await signInWithMockedAdmin();
  const newCategory = getOneMockCategory();
  const newCategoryRef = await createCategory(newCategory);
  const newCategoryKey = newCategoryRef.key;

  if (!newCategoryKey) {
    throw new Error('Expected newCategoryKey to be a string but got null instead');
  }

  const newCategoryName = 'new name';
  await updateCategory({ ...newCategory, name: newCategoryName, id: newCategoryKey });

  const snapshot = await get(newCategoryRef);
  const updatedCategory = snapshot.val();
  expect(updatedCategory.name).toBe(newCategoryName);

  // clean up added category
  if (newCategoryKey) {
    await deleteCategory({ recipes, category: { ...newCategory, id: newCategoryKey } });
  }
});

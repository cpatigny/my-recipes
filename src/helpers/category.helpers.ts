import { getDatabase, push, ref, remove, set, update } from 'firebase/database';
import { DEFAULT_RECIPE_CATEGORY } from '../constants';
import { Categories, Category, CategoryWithId } from '../types/category';
import { Recipes } from '../types/recipe';

export const countRecipesByCategory = (
  recipes: Recipes,
  categoryId: string,
) => {
  let count = 0;

  Object.keys(recipes).forEach(key => {
    const recipe = recipes[key];
    if (recipe?.categoryId === categoryId) count++;
  });

  return count;
};

export const getCategoriesOrderByRecipeCount = (
  categories: Categories,
  recipes: Recipes,
) => {
  const categoriesOrderByRecipeCount: CategoryWithId[] = Object.keys(categories)
    .sort((keyA, keyB) => {
      const a = countRecipesByCategory(recipes, keyA);
      const b = countRecipesByCategory(recipes, keyB);
      return b - a;
    })
    .map(key => ({ id: key, ...categories[key]! }));

  return categoriesOrderByRecipeCount;
};

export const getCategoryBySlug = (
  categories: Categories,
  slug: string,
): CategoryWithId | null => {
  const matchingCategoryKey = Object.keys(categories).find(
    key => categories[key]?.slug === slug,
  );

  if (!matchingCategoryKey) return null;

  const matchingCategory = categories[matchingCategoryKey];

  if (!matchingCategory) return null;

  return {
    id: matchingCategoryKey,
    ...matchingCategory,
  };
};

export const getCategoryName = (
  categoryId: string | false,
  categories: Categories | null,
) => {
  if (!categories || !categoryId) {
    return DEFAULT_RECIPE_CATEGORY.name;
  }

  const category = categories[categoryId];

  if (!category) {
    return DEFAULT_RECIPE_CATEGORY.name;
  }

  return category.name;
};

/* firebase */

interface DeleteCategoryParams {
  recipes: Recipes;
  category: CategoryWithId;
}

export const createCategory = (category: Category) => {
  const db = getDatabase();
  const categoriesRef = ref(db, 'categories');
  return push(categoriesRef, category);
};

export const deleteCategory = async ({
  recipes,
  category,
}: DeleteCategoryParams) => {
  const db = getDatabase();

  // remove the category from all recipes that have it
  const recipesToUpdate: Recipes = {};

  Object.keys(recipes)
    .filter(key => recipes[key]?.categoryId === category.id)
    .forEach(key => {
      const recipe = recipes[key];
      if (!recipe) return;
      const updatedRecipe = { ...recipe };
      updatedRecipe.categoryId = false;
      recipesToUpdate[key] = updatedRecipe;
    });

  const recipesRef = ref(db, 'recipes');
  await update(recipesRef, recipesToUpdate);

  const categoryRef = ref(db, `categories/${category.id}`);
  return remove(categoryRef);
};

export const updateCategory = (category: CategoryWithId) => {
  const db = getDatabase();
  const categoryRef = ref(db, `categories/${category.id}`);
  const { name, slug } = category;
  return set(categoryRef, { name, slug });
};

import {
  getDatabase, push, update, remove, set, ref,
} from 'firebase/database';
import { Recipes } from '../../types/recipe';
import { Category, CategoryWithId } from '../../types/category';

interface DeleteCategoryParams {
  recipes: Recipes;
  category: CategoryWithId;
}

export const createCategory = (category: Category) => {
  const db = getDatabase();
  const categoriesRef = ref(db, 'categories');
  return push(categoriesRef, category);
};

export const deleteCategory = async ({ recipes, category }: DeleteCategoryParams) => {
  const db = getDatabase();

  // remove the category from all recipes that have it
  const recipesToUpdate: Recipes = {};

  Object
    .keys(recipes)
    .filter(key => recipes[key]?.category === category.id)
    .forEach(key => {
      const recipe = recipes[key];
      if (!recipe) return;
      const updatedRecipe = { ...recipe };
      updatedRecipe.category = false;
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

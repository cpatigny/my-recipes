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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const recipe = { ...recipes[key]! }; // recipes[key] always exists since we made it to forEach
      recipe.category = 'none';
      recipesToUpdate[key] = recipe;
    });

  const recipesRef = ref(db, 'recipes');
  await update(recipesRef, recipesToUpdate);

  // delete the category
  const categoryRef = ref(db, `categories/${category.id}`);
  return remove(categoryRef);
};

export const updateCategory = (category: CategoryWithId) => {
  const db = getDatabase();
  const categoryRef = ref(db, `categories/${category.id}`);
  const { name, slug } = category;
  return set(categoryRef, { name, slug });
};

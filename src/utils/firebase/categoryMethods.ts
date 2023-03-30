import {
  getDatabase, push, update, remove, set, ref,
} from 'firebase/database';
import { Recipes } from '../../types/recipe';
import { CategoryWithId } from '../../types/category';

interface DeleteCategoryParams {
  recipes: Recipes;
  category: CategoryWithId;
}

interface UpdateCategoryParams {
  category: CategoryWithId;
  categoryName: string;
}

export const createCategory = (categoryName: string) => {
  const db = getDatabase();
  const categoriesRef = ref(db, 'categories');

  // We don't return because push returns the ref of the newly created category
  // and it is a non serializable object so it generates an error
  return push(categoriesRef, categoryName);
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

export const updateCategory = ({ category, categoryName }: UpdateCategoryParams) => {
  const db = getDatabase();
  const categoryRef = ref(db, `categories/${category.id}`);
  return set(categoryRef, categoryName);
};

import {
  getDatabase, remove, update, push, ref,
} from 'firebase/database';
import { getStorage, deleteObject, ref as storageRef } from 'firebase/storage';
import { RecipeWithId, RecipeFormData } from '../../types/recipe';

interface UpdateRecipeParams {
  recipe: RecipeWithId;
  recipeFormData: RecipeFormData;
}

export const deleteRecipe = async (recipe: RecipeWithId) => {
  // if the recipe has an image we delete it
  if (recipe.imageName) {
    const storage = getStorage();
    const imageRef = storageRef(storage, `recipe-images/${recipe.imageName}`);

    await deleteObject(imageRef);
  }

  const db = getDatabase();
  const recipeRef = ref(db, `recipes/${recipe.id}`);
  return remove(recipeRef);
};

export const updateRecipe = ({ recipe, recipeFormData }: UpdateRecipeParams) => {
  const db = getDatabase();
  const recipeRef = ref(db, `recipes/${recipe.id}`);
  return update(recipeRef, recipeFormData);
};

export const createRecipe = (recipeFormData: RecipeFormData) => {
  const db = getDatabase();
  const recipesRef = ref(db, 'recipes');
  return push(recipesRef, recipeFormData);
};

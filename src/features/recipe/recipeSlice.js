import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import '../../utils/firebase/firebase';
import {
  getDatabase, ref, remove, update, push, onValue,
} from 'firebase/database';
import { deleteObject, getStorage, ref as storageRef } from 'firebase/storage';

const initialState = {
  loading: true,
  recipes: null,
  error: '',
};

export const deleteRecipe = createAsyncThunk('recipe/deleteRecipe', recipe => {
  // if the recipe has an image we delete it
  if (recipe.imageName) {
    const storage = getStorage();
    const imageRef = storageRef(storage, `recipe-images/${recipe.imageName}`);

    deleteObject(imageRef).catch(error => console.error(error));
  }

  const db = getDatabase();
  const recipeRef = ref(db, `recipes/${recipe.id}`);
  return remove(recipeRef);
});

export const updateRecipe = createAsyncThunk('recipe/updateRecipe', ({ recipe, recipeFormData }) => {
  const db = getDatabase();
  const recipeRef = ref(db, `recipes/${recipe.id}`);
  return update(recipeRef, recipeFormData);
});

export const createRecipe = createAsyncThunk('recipe/createRecipe', recipeFormData => {
  const db = getDatabase();
  const recipesRef = ref(db, 'recipes');

  // We don't return because push returns the ref of the newly created recipe
  // and it is a non serializable object so it generates an error
  push(recipesRef, recipeFormData);
});

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    fetchRecipesSuccess: (state, action) => {
      state.loading = false;
      state.recipes = action.payload;
      state.error = '';
    },
    fetchRecipesFailure: (state, action) => {
      state.loading = false;
      state.recipes = null;
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(deleteRecipe.rejected, (state, action) => {
      console.error(action.error);
    });

    builder.addCase(updateRecipe.rejected, (state, action) => {
      console.error(action.error);
    });

    builder.addCase(createRecipe.rejected, (state, action) => {
      console.error(action.error);
    });
  },
});

export const { fetchRecipesSuccess, fetchRecipesFailure } = recipeSlice.actions;

export const recipesListener = () => dispatch => {
  const db = getDatabase();
  const recipesRef = ref(db, 'recipes');

  return onValue(recipesRef, snapshot => {
    dispatch(fetchRecipesSuccess(snapshot.val()));
  }, error => dispatch(fetchRecipesFailure(error.message)));
};

export default recipeSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDatabase, push, ref, remove, set, update,
} from 'firebase/database';
import '../../utils/firebase/firebase';

const initialState = {
  loading: true,
  categories: null,
  error: '',
};

export const createCategory = createAsyncThunk('category/createCategory', categoryName => {
  const db = getDatabase();
  const categoriesRef = ref(db, 'categories');

  // We don't return because push returns the ref of the newly created category
  // and it is a non serializable object so it generates an error
  push(categoriesRef, categoryName);
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async ({ recipes, category }) => {
  const db = getDatabase();

  // remove the category from all recipes that have it
  const recipesToUpdate = {};

  Object
    .keys(recipes)
    .filter(key => recipes[key].category === category.id)
    .forEach(key => {
      const recipe = { ...recipes[key] };
      recipe.category = 'none';
      recipesToUpdate[key] = recipe;
    });

  const recipesRef = ref(db, 'recipes');
  await update(recipesRef, recipesToUpdate);

  // delete the category
  const categoryRef = ref(db, `categories/${category.id}`);
  return remove(categoryRef);
});

export const updateCategory = createAsyncThunk('category/updateCategory', ({ category, categoryName }) => {
  const db = getDatabase();
  const categoryRef = ref(db, `categories/${category.id}`);
  return set(categoryRef, categoryName);
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = '';
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false;
      state.categories = null;
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(createCategory.rejected, (state, action) => {
      console.error(action.error);
    });

    builder.addCase(deleteCategory.rejected, (state, action) => {
      console.error(action.error);
    });

    builder.addCase(updateCategory.rejected, (state, action) => {
      console.error(action.error);
    });
  },
});

export default categorySlice.reducer;
export const { fetchCategoriesSuccess, fetchCategoriesFailure } = categorySlice.actions;

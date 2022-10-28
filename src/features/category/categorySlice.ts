import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getDatabase, push, ref, remove, set, update, onValue,
} from 'firebase/database';
import '../../utils/firebase/firebase';
import { Categories, CategoryWithId } from '../../types/category';
import { Recipes } from '../../types/recipe';
import { AppThunk } from '../../app/store';

interface DeleteCategoryParams {
  recipes: Recipes;
  category: CategoryWithId;
}

interface UpdateCategoryParams {
  category: CategoryWithId;
  categoryName: string;
}

interface InitialState {
  loading: boolean;
  categories: Categories | null;
  error: string;
}

const initialState: InitialState = {
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

export const deleteCategory = createAsyncThunk('category/deleteCategory', async ({ recipes, category }: DeleteCategoryParams) => {
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
});

export const updateCategory = createAsyncThunk('category/updateCategory', ({ category, categoryName }: UpdateCategoryParams) => {
  const db = getDatabase();
  const categoryRef = ref(db, `categories/${category.id}`);
  return set(categoryRef, categoryName);
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategoriesSuccess: (state, action: PayloadAction<Categories>) => {
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

export const { fetchCategoriesSuccess, fetchCategoriesFailure } = categorySlice.actions;

export const categoriesListener = (): AppThunk => dispatch => {
  const db = getDatabase();
  const categoriesRef = ref(db, 'categories');

  return onValue(categoriesRef, snapshot => {
    dispatch(fetchCategoriesSuccess(snapshot.val()));
  }, error => dispatch(fetchCategoriesFailure(error.message)));
};

export default categorySlice.reducer;

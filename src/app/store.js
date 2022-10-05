import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import recipeReducer from '../features/recipe/recipeSlice';
import categoryReducer from '../features/category/categorySlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    recipe: recipeReducer,
    category: categoryReducer,
  },
});

export default store;

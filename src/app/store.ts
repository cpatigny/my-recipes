import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
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

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

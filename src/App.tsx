import React, { useEffect } from 'react';
import './utils/firebase/firebase';
import { userObserver } from './features/user/userSlice';
import { categoriesListener } from './features/category/categorySlice';
import { recipesListener } from './features/recipe/recipeSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';

import {
  BrowserRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';
import Login from './pages/login/Login';
import AddRecipe from './pages/addRecipe/AddRecipe';
import Recipe from './pages/Recipe/Recipe';
import EditRecipe from './pages/editRecipe/EditRecipe';
import Categories from './pages/categories/Categories';
import Home from './pages/home/Home';
import Loading from './components/Loading/Loading';
import Error from './components/Error/Error';

const App = () => {
  const { userLoading, userDataLoading, userDataError } = useAppSelector(state => state.user);
  const { loading: recipesLoading, error: recipesError } = useAppSelector(state => state.recipe);
  const {
    loading: categoriesLoading,
    error: categoriesError,
  } = useAppSelector(state => state.category);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userObserver());
    dispatch(recipesListener());
    dispatch(categoriesListener());
  }, [dispatch]);

  const loadings = [userLoading, userDataLoading, recipesLoading, categoriesLoading];
  const errors = [userDataError, recipesError, categoriesError];

  if (loadings.includes(true)) return <Loading />;
  if (errors.join('').length > 0) {
    console.error(errors);
    return <Error />;
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/add-recipe' element={<AddRecipe />} />
        <Route path='/edit/:slug' element={<EditRecipe />} />
        <Route path='/recette/:slug' element={<Recipe />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  );
};

export default App;

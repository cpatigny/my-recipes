import React, { useEffect } from 'react';
import './utils/firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignInUserSuccess, noSignInUser, fetchUserData } from './features/user/userSlice';
import { fetchRecipesFailure, fetchRecipesSuccess } from './features/recipe/recipeSlice';
import { fetchCategoriesFailure, fetchCategoriesSuccess } from './features/category/categorySlice';
import { getDatabase, ref, onValue } from 'firebase/database';

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
  const { userLoading, userDataLoading, userDataError } = useSelector(state => state.user);
  const { loading: recipesLoading, error: recipesError } = useSelector(state => state.recipe);
  const {
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector(state => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    // fetch user
    const auth = getAuth();

    return onAuthStateChanged(auth, signedInUser => {
      // We serialized the object because redux shouldn't store non-serializable value
      const serializedUser = JSON.parse(JSON.stringify(signedInUser));

      dispatch(fetchSignInUserSuccess(serializedUser)); // null if no user signed in

      if (signedInUser) {
        dispatch(fetchUserData());
      } else {
        dispatch(noSignInUser());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    // fetch recipes
    const db = getDatabase();
    const recipesRef = ref(db, 'recipes');

    return onValue(recipesRef, snapshot => {
      dispatch(fetchRecipesSuccess(snapshot.val()));
    }, error => dispatch(fetchRecipesFailure(error.message)));
  }, [dispatch]);

  useEffect(() => {
    // fetch categories
    const db = getDatabase();
    const categoriesRef = ref(db, 'categories');

    return onValue(categoriesRef, snapshot => {
      dispatch(fetchCategoriesSuccess(snapshot.val()));
    }, error => dispatch(fetchCategoriesFailure(error.message)));
  }, [dispatch]);

  const loadings = [userLoading, userDataLoading, recipesLoading, categoriesLoading];
  const errors = [userDataError, recipesError, categoriesError];

  if (loadings.includes(true)) return <Loading />;
  if (errors.join('').length > 0) {
    console.error(errors);
    return <Error errors={errors} />;
  }

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
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

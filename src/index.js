import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';
import App from './pages/home/App';
import Login from './pages/login/Login';
import UserProvider from './providers/UserProvider';
import AddRecipe from './pages/addRecipe/AddRecipe';
import Recipe from './pages/Recipe/Recipe';
import RecipesProvider from './providers/RecipesProvider';
import EditRecipe from './pages/editRecipe/EditRecipe';
import Categories from './pages/categories/Categories';

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={
            <RecipesProvider>
              <App />
            </RecipesProvider>
          } />
          <Route path='/admin' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/add-recipe' element={<AddRecipe />} />
          <Route path='/edit/:slug' element={
            <RecipesProvider>
              <EditRecipe />
            </RecipesProvider>
          } />
          <Route path='/recette/:slug' element={
            <RecipesProvider>
              <Recipe />
            </RecipesProvider>
          } />
          <Route path='/categories' element={
            <RecipesProvider>
              <Categories />
            </RecipesProvider>
          } />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

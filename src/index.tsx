import React from 'react';
import ReactDOM from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ROUTES_WITH_PARAMS } from './utils/routes';

import UserProvider from './providers/UserProvider';
import RecipesProvider from './providers/RecipesProvider';
import CategoriesProvider from './providers/CategoriesProvider';
import IngredientsDetailsProvider from './providers/IngredientsDetailsProvider';
import App from './App';
import NotFound from './pages/notFound/NotFound';
import Recipe from './pages/Recipe/Recipe';
import AddRecipe from './pages/addRecipe/AddRecipe';
import AdminCategories from './pages/adminCategories/AdminCategories';
import AdminIngredientsDetails from './pages/adminIngredientsDetails/AdminIngredientsDetails';
import EditRecipe from './pages/editRecipe/EditRecipe';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import AdminUnits from './pages/adminUnits/AdminUnits';

import './index.scss';
import UnitsProvider from './providers/UnitsProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const AppWithProviders = () => (
  <UserProvider>
    <RecipesProvider>
      <CategoriesProvider>
        <IngredientsDetailsProvider>
          <UnitsProvider>
            <App />
          </UnitsProvider>
        </IngredientsDetailsProvider>
      </CategoriesProvider>
    </RecipesProvider>
  </UserProvider>
);

const router = createBrowserRouter([
  {
    path: ROUTES_WITH_PARAMS.NOT_FOUND,
    element: <NotFound />,
  },
  {
    path: '/',
    element: <AppWithProviders />,
    children: [
      {
        path: ROUTES_WITH_PARAMS.HOME,
        element: <Home />,
      },
      {
        path: ROUTES_WITH_PARAMS.CATEGORY,
        element: <Home />,
      },
      {
        path: ROUTES_WITH_PARAMS.ADMIN,
        element: <Login />,
      },
      {
        path: ROUTES_WITH_PARAMS.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES_WITH_PARAMS.ADD_RECIPE,
        element: <AddRecipe />,
      },
      {
        path: ROUTES_WITH_PARAMS.EDIT_RECIPE,
        element: <EditRecipe />,
      },
      {
        path: ROUTES_WITH_PARAMS.RECIPE,
        element: <Recipe />,
      },
      {
        path: ROUTES_WITH_PARAMS.CATEGORIES,
        element: <AdminCategories />,
      },
      {
        path: ROUTES_WITH_PARAMS.INGREDIENTS,
        element: <AdminIngredientsDetails />,
      },
      {
        path: ROUTES_WITH_PARAMS.UNITS,
        element: <AdminUnits />,
      },
      {
        path: '*',
        element: <Navigate to={ROUTES_WITH_PARAMS.NOT_FOUND} replace />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

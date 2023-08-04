import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ROUTES_WITH_PARAMS } from './routes';

import { CategoriesProvider } from './contexts/CategoriesContext';
import { IngredientsDetailsProvider } from './contexts/IngredientsDetailsContext';
import { RecipesProvider } from './contexts/RecipesContext';
import { UnitsProvider } from './contexts/UnitsContext';
import { UserProvider } from './contexts/UserContext';
import { ToastProvider } from './contexts/ToastContext';
import { App } from './App';
import { NotFound } from './pages/notFound/NotFound';
import { Recipe } from './pages/Recipe/Recipe';
import { AddRecipe } from './pages/addRecipe/AddRecipe';
import { AdminCategories } from './pages/adminCategories/AdminCategories';
import { AdminIngredientsDetails } from './pages/adminIngredientsDetails/AdminIngredientsDetails';
import { EditRecipe } from './pages/editRecipe/EditRecipe';
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { AdminUnits } from './pages/adminUnits/AdminUnits';

import './index.scss';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const AppWithProviders = () => (
  <UserProvider>
    <RecipesProvider>
      <CategoriesProvider>
        <IngredientsDetailsProvider>
          <UnitsProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
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

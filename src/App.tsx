import { useContext } from 'react';
import './utils/firebase/firebase';
import { UserContext } from './providers/UserProvider';
import { RecipesContext } from './providers/RecipesProvider';
import { CategoriesContext } from './providers/CategoriesProvider';
import { useIngredientsDetails } from './providers/IngredientsDetailsProvider';
import { ROUTES_WITH_PARAMS } from './utils/routes';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Login from './pages/login/Login';
import AddRecipe from './pages/addRecipe/AddRecipe';
import Recipe from './pages/Recipe/Recipe';
import EditRecipe from './pages/editRecipe/EditRecipe';
import AdminCategories from './pages/adminCategories/AdminCategories';
import Home from './pages/home/Home';
import Loading from './components/Loading/Loading';
import AdminIngredientsDetails from './pages/adminIngredientsDetails/AdminIngredientsDetails';

const router = createBrowserRouter([
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
    path: '*',
    element: <Navigate to={ROUTES_WITH_PARAMS.HOME} replace />,
  },
]);

const App = () => {
  const { userLoading } = useContext(UserContext);
  const { recipesLoading } = useContext(RecipesContext);
  const { categoriesLoading } = useContext(CategoriesContext);
  const { ingredientsDetailsLoading } = useIngredientsDetails();

  const loadings = [userLoading, recipesLoading, categoriesLoading, ingredientsDetailsLoading];

  if (loadings.includes(true)) return <Loading />;

  return (
    <RouterProvider router={router} />
  );
};

export default App;

import { useContext } from 'react';
import './utils/firebase/firebase';
import { UserContext } from './providers/UserProvider';
import { RecipesContext } from './providers/RecipesProvider';
import { CategoriesContext } from './providers/CategoriesProvider';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Login from './pages/login/Login';
import AddRecipe from './pages/addRecipe/AddRecipe';
import Recipe from './pages/Recipe/Recipe';
import EditRecipe from './pages/editRecipe/EditRecipe';
import AdminCategories from './pages/adminCategories/AdminCategories';
import Home from './pages/home/Home';
import Loading from './components/Loading/Loading';
import AdminIngredients from './pages/adminIngredients/AdminIngredients';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'category/:slug',
    element: <Home />,
  },
  {
    path: 'admin',
    element: <Login />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'add-recipe',
    element: <AddRecipe />,
  },
  {
    path: 'edit/:slug',
    element: <EditRecipe />,
  },
  {
    path: 'recette/:slug',
    element: <Recipe />,
  },
  {
    path: 'categories',
    element: <AdminCategories />,
  },
  {
    path: 'ingredients',
    element: <AdminIngredients />,
  },
  {
    path: '*',
    element: <Navigate to='/' replace />,
  },
]);

const App = () => {
  const { userLoading } = useContext(UserContext);
  const { recipesLoading } = useContext(RecipesContext);
  const { categoriesLoading } = useContext(CategoriesContext);

  const loadings = [userLoading, recipesLoading, categoriesLoading];

  if (loadings.includes(true)) return <Loading />;

  return (
    <RouterProvider router={router} />
  );
};

export default App;

import { useContext } from 'react';
import './utils/firebase/firebase';

import {
  BrowserRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';
import Login from './pages/login/Login';
import AddRecipe from './pages/addRecipe/AddRecipe';
import Recipe from './pages/Recipe/Recipe';
import EditRecipe from './pages/editRecipe/EditRecipe';
import AdminCategories from './pages/adminCategories/AdminCategories';
import Home from './pages/home/Home';
import Loading from './components/Loading/Loading';
import { UserContext } from './providers/UserProvider';
import { RecipesContext } from './providers/RecipesProvider';
import { CategoriesContext } from './providers/CategoriesProvider';

const App = () => {
  const { userLoading } = useContext(UserContext);
  const { recipesLoading } = useContext(RecipesContext);
  const { categoriesLoading } = useContext(CategoriesContext);

  const loadings = [userLoading, recipesLoading, categoriesLoading];

  if (loadings.includes(true)) return <Loading />;

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/add-recipe' element={<AddRecipe />} />
        <Route path='/edit/:slug' element={<EditRecipe />} />
        <Route path='/recette/:slug' element={<Recipe />} />
        <Route path='/categories' element={<AdminCategories />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  );
};

export default App;

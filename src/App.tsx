import { useContext } from 'react';
import './utils/firebase/firebase';
import { UserContext } from './providers/UserProvider';
import { RecipesContext } from './providers/RecipesProvider';
import { CategoriesContext } from './providers/CategoriesProvider';
import { useIngredientsDetails } from './providers/IngredientsDetailsProvider';

import Loading from './components/Loading/Loading';
import { Outlet } from 'react-router-dom';

const App = () => {
  const { userLoading } = useContext(UserContext);
  const { recipesLoading } = useContext(RecipesContext);
  const { categoriesLoading } = useContext(CategoriesContext);
  const { ingredientsDetailsLoading } = useIngredientsDetails();

  const loadings = [userLoading, recipesLoading, categoriesLoading, ingredientsDetailsLoading];

  if (loadings.includes(true)) return <Loading />;

  return (
    <Outlet />
  );
};

export default App;

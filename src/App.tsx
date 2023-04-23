import './utils/firebase/firebase';
import { useUser } from './providers/UserProvider';
import { useRecipes } from './providers/RecipesProvider';
import { useCategories } from './providers/CategoriesProvider';
import { useIngredientsDetails } from './providers/IngredientsDetailsProvider';

import Loading from './components/Loading/Loading';
import { Outlet } from 'react-router-dom';

const App = () => {
  const { userLoading } = useUser();
  const { recipesLoading } = useRecipes();
  const { categoriesLoading } = useCategories();
  const { ingredientsDetailsLoading } = useIngredientsDetails();

  const loadings = [userLoading, recipesLoading, categoriesLoading, ingredientsDetailsLoading];

  if (loadings.includes(true)) return <Loading />;

  return (
    <Outlet />
  );
};

export default App;

import './utils/firebase/firebase';
import { useUser } from './providers/UserProvider';
import { useRecipes } from './providers/RecipesProvider';
import { useCategories } from './providers/CategoriesProvider';
import { useIngredientsDetails } from './providers/IngredientsDetailsProvider';
import { useUnits } from './providers/UnitsProvider';

import Loading from './components/Loading/Loading';
import { Outlet } from 'react-router-dom';

const App = () => {
  const { userLoading } = useUser();
  const { recipesLoading } = useRecipes();
  const { categoriesLoading } = useCategories();
  const { ingredientsDetailsLoading } = useIngredientsDetails();
  const { unitsLoading } = useUnits();

  const loadings = [
    userLoading, recipesLoading, categoriesLoading, ingredientsDetailsLoading, unitsLoading,
  ];

  if (loadings.includes(true)) return <Loading />;

  return (
    <Outlet />
  );
};

export default App;

import './firebase';
import { useUser } from './contexts/UserContext';
import { useRecipes } from './contexts/RecipesContext';
import { useCategories } from './contexts/CategoriesContext';
import { useIngredientsDetails } from './contexts/IngredientsDetailsContext';
import { useUnits } from './contexts/UnitsContext';

import { Loading } from './components/Loading';
import { Outlet } from 'react-router-dom';

export const App = () => {
  const { userLoading } = useUser();
  const { recipesLoading } = useRecipes();
  const { categoriesLoading } = useCategories();
  const { ingredientsDetailsLoading } = useIngredientsDetails();
  const { unitsLoading } = useUnits();

  const loadings = [
    userLoading,
    recipesLoading,
    categoriesLoading,
    ingredientsDetailsLoading,
    unitsLoading,
  ];

  if (loadings.includes(true)) return <Loading />;

  return <Outlet />;
};

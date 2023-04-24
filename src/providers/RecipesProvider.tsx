import { createContext, useContext, useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Recipes } from '../types/recipe';

interface RecipesContextValues {
  recipes: Recipes | null;
  recipesLoading: boolean;
}

const RecipesContext = createContext<RecipesContextValues | null>(null);

const RecipesProvider = ({ children }: { children: React.ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipes | null>(null);
  const [recipesLoading, setRecipesLoading] = useState<boolean>(true);

  useEffect(() => {
    const db = getDatabase();
    const recipesRef = ref(db, 'recipes');

    return onValue(recipesRef, snapshot => {
      const data = snapshot.val();
      setRecipes(data);
      setRecipesLoading(false);
    });
  }, []);

  return (
    <RecipesContext.Provider value={{ recipes, recipesLoading }}>
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipesContext);

  if (!context) {
    throw new Error('useRecipes must be used within a RecipesProvider');
  }

  return context;
};

export default RecipesProvider;

import { getDatabase, ref, onValue } from 'firebase/database';
import { createContext, useEffect, useState } from 'react';
import { Recipes } from '../types/recipe';

interface RecipesContextValues {
  recipes: Recipes | null;
  recipesLoading: boolean;
}

export const RecipesContext = createContext<RecipesContextValues>({
  recipes: null,
  recipesLoading: true,
});

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

export default RecipesProvider;

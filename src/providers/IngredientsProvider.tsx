import { createContext, useContext, useEffect, useState } from 'react';
import { Ingredients } from '../types/ingredient';
import { getDatabase, onValue, ref } from 'firebase/database';

interface IngredientsContextValues {
  ingredients: Ingredients | null;
  ingredientsLoading: boolean;
}

const IngredientsContext = createContext<IngredientsContextValues>({
  ingredients: null,
  ingredientsLoading: true,
});

const IngredientsProvider = ({ children }: { children: React.ReactNode }) => {
  const [ingredients, setIngredients] = useState(null);
  const [ingredientsLoading, setIngredientsLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const ingredientsRef = ref(db, 'ingredients');

    return onValue(ingredientsRef, snapshot => {
      const data = snapshot.val();
      setIngredients(data);
      setIngredientsLoading(false);
    });
  }, []);

  return (
    <IngredientsContext.Provider value={{ ingredients, ingredientsLoading }}>
      { children }
    </IngredientsContext.Provider>
  );
};

export const useIngredients = () => {
  const context = useContext(IngredientsContext);

  if (!context) {
    throw new Error('useIngredients must be used within a IngredientsProvider');
  }

  return context;
};

export default IngredientsProvider;

import { createContext, useContext, useEffect, useState } from 'react';
import { IngredientsDetails } from '../types/ingredientDetails';
import { getDatabase, onValue, ref } from 'firebase/database';

interface IngredientsDetailsContextValues {
  ingredientsDetails: IngredientsDetails | null;
  ingredientsDetailsLoading: boolean;
}

const IngredientsDetailsContext = createContext<IngredientsDetailsContextValues | null>(null);

export const IngredientsDetailsProvider = ({ children }: { children: React.ReactNode }) => {
  const [ingredientsDetails, setIngredients] = useState(null);
  const [ingredientsDetailsLoading, setIngredientsLoading] = useState(true);

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
    <IngredientsDetailsContext.Provider value={{ ingredientsDetails, ingredientsDetailsLoading }}>
      { children }
    </IngredientsDetailsContext.Provider>
  );
};

export const useIngredientsDetails = () => {
  const context = useContext(IngredientsDetailsContext);

  if (!context) {
    throw new Error('useIngredientsDetails must be used within a IngredientsDetailsProvider');
  }

  return context;
};

export default IngredientsDetailsContext;

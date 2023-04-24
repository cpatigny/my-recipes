import { createContext, useContext, useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Categories } from '../types/category';

interface CategoriesContextValues {
  categories: Categories | null;
  categoriesLoading: boolean;
}

const CategoriesContext = createContext<CategoriesContextValues | null>(null);

const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Categories | null>(null);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);

  useEffect(() => {
    const db = getDatabase();
    const categoriesRef = ref(db, 'categories');

    return onValue(categoriesRef, snapshot => {
      const data = snapshot.val();
      setCategories(data);
      setCategoriesLoading(false);
    });
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, categoriesLoading }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }

  return context;
};

export default CategoriesProvider;

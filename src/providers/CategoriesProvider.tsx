import { getDatabase, ref, onValue } from 'firebase/database';
import { createContext, useEffect, useState } from 'react';
import { Categories } from '../types/category';

interface CategoriesContextValues {
  categories: Categories | null;
  categoriesLoading: boolean;
}

export const CategoriesContext = createContext<CategoriesContextValues>({
  categories: null,
  categoriesLoading: true,
});

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

export default CategoriesProvider;
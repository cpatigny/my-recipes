import { createContext, useContext, useEffect, useState } from 'react';
import { Units } from '../types/unit';
import { getDatabase, ref, onValue } from 'firebase/database';

interface UnitsContextValues {
  units: Units | null;
  unitsLoading: boolean;
}

const UnitsContext = createContext<UnitsContextValues | null>(null);

const UnitsProvider = ({ children }: { children: React.ReactNode }) => {
  const [units, setUnits] = useState(null);
  const [unitsLoading, setUnitsLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const unitsRef = ref(db, 'units');

    return onValue(unitsRef, snapshot => {
      const data = snapshot.val();
      setUnits(data);
      setUnitsLoading(false);
    });
  }, []);

  return (
    <UnitsContext.Provider value={{ units, unitsLoading }}>
      { children }
    </UnitsContext.Provider>
  );
};

export const useUnits = () => {
  const context = useContext(UnitsContext);

  if (!context) {
    throw new Error('useUnits must be used within a UnitsProvider');
  }

  return context;
};

export default UnitsProvider;

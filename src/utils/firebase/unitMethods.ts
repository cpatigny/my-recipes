import { getDatabase, ref, push, set } from 'firebase/database';
import { Unit, UnitWithId } from '../../types/unit';

export const createUnit = (unit: Unit) => {
  const db = getDatabase();
  const unitsRef = ref(db, 'units');
  return push(unitsRef, unit);
};

export const updateUnit = (unit: UnitWithId) => {
  const db = getDatabase();
  const unitRef = ref(db, `units/${unit.id}`);
  return set(unitRef, unit);
};

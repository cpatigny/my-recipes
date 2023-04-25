import { UnitWithId, Units } from '../../types/unit';
import strContains from '../string/strContains';

const getMatchingUnits = (search: string, units: Units | null) => {
  if (!units) {
    return [];
  }

  const matchingUnits: UnitWithId[] = [];

  Object
    .keys(units)
    .forEach(key => {
      const unit = units[key];
      if (!unit) return;
      const singularContainsSearch = strContains(unit.singular, search);
      const pluralContainsSearch = strContains(unit.plural, search);

      if (singularContainsSearch || pluralContainsSearch) {
        matchingUnits.push({ id: key, ...unit });
      }
    });

  return matchingUnits;
};

export default getMatchingUnits;

import { RecipeIngredient } from '../../types/recipe';
import { Units } from '../../types/unit';

const getUnitDetails = (units: Units | null, unitId?: RecipeIngredient['unitId']) => {
  const defaultUnit = {
    singular: '',
    plural: '',
    symbol: null,
  };

  if (!units || !unitId) {
    return defaultUnit;
  }

  const unit = units[unitId];

  if (!unit) {
    return defaultUnit;
  }

  return unit;
};

export default getUnitDetails;

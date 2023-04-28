import { RecipeIngredient } from '../../types/recipe';
import { Unit, Units } from '../../types/unit';

const getUnitDetails = (units: Units | null, unitId?: RecipeIngredient['unitId']) => {
  const defaultUnit: Unit = {
    singular: '',
    plural: '',
    symbol: false,
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

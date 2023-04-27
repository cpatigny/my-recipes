import { Unit } from '../../types/unit';

const getUnitName = (unit: Unit, quantity: number) => {
  if (unit.symbol) {
    return unit.symbol;
  }

  if (quantity > 1) {
    return unit.plural;
  }

  return unit.singular;
};

export default getUnitName;

import { getMockUnits } from '../../tests-utils/mocks/units.mock';
import { Unit } from '../../types/unit';
import { getMatchingUnits, getUnitName } from '../units.helpers';

describe('getMatchingUnits', () => {
  const units = getMockUnits(50);
  const key = Object.keys(units)[10];
  const item = key ? units[key] : null;
  if (!item) return;

  test('should return the matching units using singular', () => {
    const matchingUnits = getMatchingUnits(item.singular, units);
    expect(matchingUnits.some(u => u.id === key)).toBe(true);
  });

  test('should return the matching units using plural', () => {
    const matchingUnits = getMatchingUnits(item.plural, units);
    expect(matchingUnits.some(u => u.id === key)).toBe(true);
  });

  test('should return an empty array if no match', () => {
    const search = 'azerty123456';
    const matchingUnits = getMatchingUnits(search, units);
    expect(matchingUnits.length).toBe(0);
  });
});

describe('getUnitName', () => {
  test('should return the symbol if there is one', () => {
    const unit: Unit = {
      symbol: 'g',
      singular: 'gram',
      plural: 'grams',
    };

    expect(getUnitName(unit, 5)).toBe('g');
  });

  test('should return the plural if no symbol and quantity is greater than or equal to 2', () => {
    const unit: Unit = {
      singular: 'gram',
      plural: 'grams',
      symbol: false,
    };

    expect(getUnitName(unit, 2)).toBe('grams');
  });

  test('should return the singular if no symbol and quantity is less than 2', () => {
    const unit: Unit = {
      singular: 'gram',
      plural: 'grams',
      symbol: false,
    };

    expect(getUnitName(unit, 0.5)).toBe('gram');
  });
});

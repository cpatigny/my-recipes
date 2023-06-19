import { faker } from '@faker-js/faker';
import { getMockUnits } from '../../tests-utils/mocks/units.mock';
import { Unit } from '../../types/unit';
import { getMatchingUnits, getUnitName, getUnitNameById } from '../units.helpers';

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

describe('getUnitNameById', () => {
  const units = getMockUnits(20);

  test('should return an empty string if units parameter is null', () => {
    const key = Object.keys(units)[10];
    if (!key) return;
    const name = getUnitNameById(null, key);
    expect(name).toBe('');
  });

  test('should return an empty string if id parameter is an empty string', () => {
    const name = getUnitNameById(units, '');
    expect(name).toBe('');
  });

  test('should return an empty string if id parameter doesn\'t match a unit', () => {
    const name = getUnitNameById(units, 'randomId123');
    expect(name).toBe('');
  });

  test('should return unit singular if id matches and symbol is false', () => {
    const unit: Unit = {
      singular: 'gram',
      plural: 'grams',
      symbol: false,
    };
    const key = faker.string.uuid();
    units[key] = unit;
    const name = getUnitNameById(units, key);
    expect(name).toBe(unit.singular);
  });

  test('should return unit singular and symbol within parenthesis if symbol is defined and id matches', () => {
    const unit: Unit = {
      singular: 'gram',
      plural: 'grams',
      symbol: 'g',
    };
    const key = faker.string.uuid();
    units[key] = unit;
    const name = getUnitNameById(units, key);
    expect(name).toBe(`${unit.singular} (${unit.symbol})`);
  });
});

// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { Unit, UnitWithId, Units } from '../../types/unit';

export const generateOneMockUnit = (): Unit => {
  return {
    singular: faker.word.noun(),
    plural: faker.word.noun(),
    symbol: faker.datatype.boolean(0.3) ? faker.word.noun() : false,
  };
};

export const generateOneMockUnitWithId = (): UnitWithId => {
  return {
    ...generateOneMockUnit(),
    id: faker.string.nanoid(),
  };
};

export const generateMockUnits = () => {
  const mockUnits: Units = {};

  for (let i = 1; i < 25; i++) {
    mockUnits[`unit${i}`] = generateOneMockUnit();
  }

  return mockUnits;
};

export const generateMockUnitsWithId = () => {
  const mockUnits: UnitWithId[] = [];

  for (let i = 1; i < 25; i++) {
    mockUnits.push(generateOneMockUnitWithId());
  }

  return mockUnits;
};

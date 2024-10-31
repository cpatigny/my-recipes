import { faker } from '@faker-js/faker';
import { Unit, UnitWithId, Units } from '../../types/unit';

export const getOneMockUnit = (): Unit => {
  return {
    singular: faker.word.noun(),
    plural: faker.word.noun(),
    symbol: faker.datatype.boolean(0.3) ? faker.word.noun() : false,
  };
};

export const getOneMockUnitWithId = (): UnitWithId => {
  return {
    ...getOneMockUnit(),
    id: faker.string.nanoid(),
  };
};

export const getMockUnits = (number = 25) => {
  const mockUnits: Units = {};

  for (let i = 0; i < number; i++) {
    mockUnits[`unit${i}`] = getOneMockUnit();
  }

  return mockUnits;
};

export const getMockUnitsWithId = (number = 25) => {
  const mockUnits: UnitWithId[] = [];

  for (let i = 0; i < number; i++) {
    mockUnits.push(getOneMockUnitWithId());
  }

  return mockUnits;
};

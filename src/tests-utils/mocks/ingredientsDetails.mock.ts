// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { IngredientDetails, IngredientDetailsWithId, IngredientsDetails } from '../../types/ingredientDetails';

export const generateOneMockIngredientDetails = (): IngredientDetails => {
  return {
    singular: faker.word.noun(),
    plural: faker.word.noun(),
  };
};

export const generateOneMockIngredientDetailsWithId = (): IngredientDetailsWithId => {
  return {
    ...generateOneMockIngredientDetails(),
    id: faker.string.nanoid(),
  };
};

export const generateMockIngredientsDetails = () => {
  const mockIngredientsDetails: IngredientsDetails = {};

  for (let i = 1; i < 200; i++) {
    mockIngredientsDetails[`ingredientDetails${i}`] = generateOneMockIngredientDetails();
  }

  return mockIngredientsDetails;
};

export const generateMockIngredientsDetailsWithId = () => {
  const mockIngredientsDetails: IngredientDetailsWithId[] = [];

  for (let i = 1; i < 200; i++) {
    mockIngredientsDetails.push(generateOneMockIngredientDetailsWithId());
  }

  return mockIngredientsDetails;
};

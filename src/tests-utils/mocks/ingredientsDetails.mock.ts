import { faker } from '@faker-js/faker';
import {
  IngredientDetails,
  IngredientDetailsWithId,
  IngredientsDetails,
} from '../../types/ingredientDetails';

export const getOneMockIngredientDetails = (): IngredientDetails => {
  return {
    name: faker.word.noun(),
    plural: faker.word.noun(),
  };
};

export const getOneMockIngredientDetailsWithId =
  (): IngredientDetailsWithId => {
    return {
      ...getOneMockIngredientDetails(),
      id: faker.string.nanoid(),
    };
  };

export const getMockIngredientsDetails = (number = 200) => {
  const mockIngredientsDetails: IngredientsDetails = {};

  for (let i = 0; i < number; i++) {
    mockIngredientsDetails[`ingredientDetails${i}`] =
      getOneMockIngredientDetails();
  }

  return mockIngredientsDetails;
};

export const getMockIngredientsDetailsWithId = (number = 200) => {
  const mockIngredientsDetails: IngredientDetailsWithId[] = [];

  for (let i = 0; i < number; i++) {
    mockIngredientsDetails.push(getOneMockIngredientDetailsWithId());
  }

  return mockIngredientsDetails;
};

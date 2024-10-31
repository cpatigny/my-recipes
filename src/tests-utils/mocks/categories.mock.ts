import { faker } from '@faker-js/faker';
import { Categories, Category, CategoryWithId } from '../../types/category';

export const getOneMockCategory = (): Category => {
  return {
    name: faker.word.noun(),
    slug: faker.lorem.slug(),
  };
};

export const getOneMockCategoryWithId = (): CategoryWithId => {
  return {
    ...getOneMockCategory(),
    id: faker.string.nanoid(),
  };
};

export const getMockCategories = (number = 6) => {
  const mockCategories: Categories = {};

  for (let i = 0; i < number; i++) {
    mockCategories[`category${i}`] = getOneMockCategory();
  }

  return mockCategories;
};

export const getMockCategoriesWithId = (number = 6) => {
  const mockCategories: CategoryWithId[] = [];

  for (let i = 0; i < number; i++) {
    mockCategories.push(getOneMockCategoryWithId());
  }

  return mockCategories;
};

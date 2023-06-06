// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { Categories, Category, CategoryWithId } from '../../types/category';

export const generateOneMockCategory = (): Category => {
  return {
    name: faker.word.noun(),
    slug: faker.lorem.slug(),
  };
};

export const generateOneMockCategoryWithId = (): CategoryWithId => {
  return {
    ...generateOneMockCategory(),
    id: faker.string.nanoid(),
  };
};

export const generateMockCategories = () => {
  const mockCategories: Categories = {};

  for (let i = 1; i <= 6; i++) {
    mockCategories[`category${i}`] = generateOneMockCategory();
  }

  return mockCategories;
};

export const generateMockCategoriesWithId = () => {
  const mockCategories: CategoryWithId[] = [];

  for (let i = 1; i <= 6; i++) {
    mockCategories.push(generateOneMockCategoryWithId());
  }

  return mockCategories;
};

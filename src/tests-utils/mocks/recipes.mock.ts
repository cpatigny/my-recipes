// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { Group, GroupWithId, Groups, Recipe, RecipeIngredient, RecipeIngredientWithId, RecipeIngredients, RecipeWithId, Recipes } from '../../types/recipe';
import { generateMockCategories } from './categories.mock';
import { generateMockIngredientsDetails } from './ingredientsDetails.mock';
import { generateMockUnits } from './units.mock';

export const generateOneMockGroup = (maxPosition: number): Group => {
  return {
    name: faker.word.words(5),
    position: maxPosition + 1,
  };
};

export const generateOneMockGroupWithId = (maxPosition: number): GroupWithId => {
  return {
    ...generateOneMockGroup(maxPosition),
    id: faker.string.nanoid(),
  };
};

interface IdList {
  detailsId: string;
  groupId: string | false;
  unitId: string | false;
}

export const generateOneMockRecipeIngredient = (
  maxPosition: number, idList: IdList,
): RecipeIngredient => {
  const quantity = faker.number.int({ min: 1, max: 600 }).toString();
  return {
    position: maxPosition + 1,
    preposition: faker.word.preposition(),
    quantity: faker.number.int(),
    additionalInfo: faker.datatype.boolean(0.15) ? quantity : false,
    detailsId: idList.detailsId,
    groupId: idList.groupId ? idList.groupId : false,
    unitId: idList.unitId ? idList.unitId : false,
  };
};

export const generateOneMockRecipeIngredientWithId = (
  maxPosition: number, idList: IdList,
): RecipeIngredientWithId => {
  return {
    ...generateOneMockRecipeIngredient(maxPosition, idList),
    id: faker.string.nanoid(),
  };
};

interface Ids {
  unitsIds: string[];
  categoriesIds: string[];
  ingredientsDetailsIds: string[];
}

export const generateOneMockRecipe = (ids: Ids): Recipe => {
  const groups: Groups = {};

  for (let i = 1; i < faker.number.int({ min: 2, max: 4 }); i++) {
    groups[`group${i}`] = generateOneMockGroup(i - 1);
  }

  const ingredients: RecipeIngredients = {};

  for (let i = 1; i < faker.number.int({ min: 6, max: 15 }); i++) {
    const randomDetailsId = faker.helpers.arrayElement(ids.ingredientsDetailsIds);
    const randomGroupId = faker.helpers.arrayElement(Object.keys(groups));
    const randomUnitId = faker.helpers.arrayElement(ids.unitsIds);

    ingredients[`ingredient${i}`] = generateOneMockRecipeIngredient(i - 1, {
      detailsId: randomDetailsId,
      groupId: faker.datatype.boolean() ? randomGroupId : false,
      unitId: faker.datatype.boolean() ? randomUnitId : false,
    });
  }

  return {
    title: faker.word.words(4),
    slug: faker.lorem.slug(),
    content: faker.lorem.paragraphs({ min: 3, max: 8 }),
    cookTimeInMins: faker.number.int(280),
    imageName: faker.image.url(),
    createdAt: new Date(faker.date.past()).getTime(),
    categoryId: faker.helpers.arrayElement(ids.categoriesIds),
    nbServings: faker.number.int({ min: 1, max: 12 }).toString(),
    servingsUnit: faker.word.noun(),
    groups,
    ingredients,
  };
};

export const generateOneMockRecipeWithId = (ids: Ids): RecipeWithId => {
  return {
    ...generateOneMockRecipe(ids),
    id: faker.string.nanoid(),
  };
};

export const generateMockRecipes = () => {
  const mockRecipes: Recipes = {};

  const categories = generateMockCategories();
  const ingredientDetails = generateMockIngredientsDetails();
  const units = generateMockUnits();

  for (let i = 1; i <= 50; i++) {
    mockRecipes[`recipe${i}`] = generateOneMockRecipe({
      categoriesIds: Object.keys(categories),
      ingredientsDetailsIds: Object.keys(ingredientDetails),
      unitsIds: Object.keys(units),
    });
  }

  return mockRecipes;
};

export const generateMockRecipesWithId = () => {
  const mockRecipes: RecipeWithId[] = [];

  const categories = generateMockCategories();
  const ingredientDetails = generateMockIngredientsDetails();
  const units = generateMockUnits();

  for (let i = 1; i <= 50; i++) {
    mockRecipes.push(generateOneMockRecipeWithId({
      categoriesIds: Object.keys(categories),
      ingredientsDetailsIds: Object.keys(ingredientDetails),
      unitsIds: Object.keys(units),
    }));
  }

  return mockRecipes;
};

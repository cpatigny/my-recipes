import { faker } from '@faker-js/faker';
import {
  Group,
  GroupWithId,
  Groups,
  Recipe,
  RecipeIngredient,
  RecipeIngredientWithId,
  RecipeIngredients,
  RecipeWithId,
  Recipes,
} from '../../types/recipe';
import { getMockCategories } from './categories.mock';
import { getMockIngredientsDetails } from './ingredientsDetails.mock';
import { getMockUnits } from './units.mock';

export const getOneMockGroup = (maxPosition: number): Group => {
  return {
    name: faker.word.words(5),
    position: maxPosition + 1,
  };
};

export const getOneMockGroupWithId = (maxPosition: number): GroupWithId => {
  return {
    ...getOneMockGroup(maxPosition),
    id: faker.string.nanoid(),
  };
};

interface IdList {
  detailsId: string;
  groupId: string | false;
  unitId: string | false;
}

export const getOneMockRecipeIngredient = (
  maxPosition: number,
  idList: IdList,
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

export const getOneMockRecipeIngredientWithId = (
  maxPosition: number,
  idList: IdList,
): RecipeIngredientWithId => {
  return {
    ...getOneMockRecipeIngredient(maxPosition, idList),
    id: faker.string.nanoid(),
  };
};

interface Ids {
  unitsIds: string[];
  categoriesIds: string[];
  ingredientsDetailsIds: string[];
}

export const getMockRecipeIngredientsWithId = (ids: Ids) => {
  const groups: Groups = {};

  for (let i = 1; i < faker.number.int({ min: 2, max: 4 }); i++) {
    groups[`group${i}`] = getOneMockGroup(i - 1);
  }

  const ingredients: RecipeIngredientWithId[] = [];

  for (let i = 1; i < faker.number.int({ min: 6, max: 15 }); i++) {
    const randomDetailsId = faker.helpers.arrayElement(
      ids.ingredientsDetailsIds,
    );
    const randomGroupId = faker.helpers.arrayElement(Object.keys(groups));
    const randomUnitId = faker.helpers.arrayElement(ids.unitsIds);

    const ing = getOneMockRecipeIngredient(i - 1, {
      detailsId: randomDetailsId,
      groupId: faker.datatype.boolean() ? randomGroupId : false,
      unitId: faker.datatype.boolean() ? randomUnitId : false,
    });

    ingredients.push({ ...ing, id: `ingredient${i}` });
  }

  return ingredients;
};

/**
 * @param alwaysGroup if recipe ingredients always have a group
 */
export const getOneMockRecipe = (
  ids: Ids,
  nbIngredients = 10,
  alwaysGroup = false,
): Recipe => {
  const groups: Groups = {};

  for (let i = 1; i < faker.number.int({ min: 2, max: 4 }); i++) {
    groups[`group${i}`] = getOneMockGroup(i - 1);
  }

  const ingredients: RecipeIngredients = {};

  for (let i = 1; i < nbIngredients; i++) {
    const randomDetailsId = faker.helpers.arrayElement(
      ids.ingredientsDetailsIds,
    );
    const randomGroupId = faker.helpers.arrayElement(Object.keys(groups));
    const randomUnitId = faker.helpers.arrayElement(ids.unitsIds);

    ingredients[`ingredient${i}`] = getOneMockRecipeIngredient(i - 1, {
      detailsId: randomDetailsId,
      groupId: faker.datatype.boolean() || alwaysGroup ? randomGroupId : false,
      unitId: faker.datatype.boolean() ? randomUnitId : false,
    });
  }

  return {
    title: faker.word.words(4),
    slug: faker.lorem.slug(),
    content: faker.lorem.paragraphs({ min: 3, max: 8 }),
    cookTimeInMins: faker.number.int(280),
    imageName: false,
    createdAt: new Date(faker.date.past()).getTime(),
    categoryId: faker.helpers.arrayElement(ids.categoriesIds),
    nbServings: faker.number.int({ min: 1, max: 12 }).toString(),
    servingsUnit: faker.word.noun(),
    groups,
    ingredients,
  };
};

export const getOneMockRecipeWithId = (ids: Ids): RecipeWithId => {
  return {
    ...getOneMockRecipe(ids),
    id: faker.string.nanoid(),
  };
};

export const getMockRecipes = (number = 50) => {
  const mockRecipes: Recipes = {};

  const categories = getMockCategories();
  const ingredientDetails = getMockIngredientsDetails();
  const units = getMockUnits();

  for (let i = 0; i < number; i++) {
    mockRecipes[`recipe${i}`] = getOneMockRecipe({
      categoriesIds: Object.keys(categories),
      ingredientsDetailsIds: Object.keys(ingredientDetails),
      unitsIds: Object.keys(units),
    });
  }

  return mockRecipes;
};

export const getMockRecipesWithId = (number = 50) => {
  const mockRecipes: RecipeWithId[] = [];

  const categories = getMockCategories();
  const ingredientDetails = getMockIngredientsDetails();
  const units = getMockUnits();

  for (let i = 0; i < number; i++) {
    mockRecipes.push(
      getOneMockRecipeWithId({
        categoriesIds: Object.keys(categories),
        ingredientsDetailsIds: Object.keys(ingredientDetails),
        unitsIds: Object.keys(units),
      }),
    );
  }

  return mockRecipes;
};

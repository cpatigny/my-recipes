import { Groups, RecipeIngredients, GroupWithIngredients } from '../types/recipe';
import { generateKey } from './firebase.helpers';
import { sortItemsByPosition } from './helpers';
import { getIngredientsByGroup, getIngredientsWithoutGroup } from './ingredient.helpers';

export const DEFAULT_GROUP = {
  id: '0',
  name: 'Ingrédients sans groupe',
  position: -1, // to always be the first group
} as const;

export const getGroupsWithTheirIngredients = (
  groups: Groups | null, ingredients: RecipeIngredients,
) => {
  if (!groups) {
    return [];
  }

  const groupsWithIngredients: GroupWithIngredients[] = [];

  Object
    .keys(groups)
    .forEach(key => {
      const group = groups[key];
      if (!group) return;

      const groupIngredients = getIngredientsByGroup(key, ingredients);

      const groupWithIngredients: GroupWithIngredients = {
        id: key,
        ...group,
        ingredients: sortItemsByPosition(groupIngredients),
      };

      groupsWithIngredients.push(groupWithIngredients);
    });

  return sortItemsByPosition(groupsWithIngredients);
};

export const generateGroupKey = (recipeId: string) => {
  const path = `recipes/${recipeId}/`;
  return generateKey(path);
};

export const getGroupItems = (groups: Groups | null, ingredients: RecipeIngredients | string) => {
  let groupItems: GroupWithIngredients[] = [];

  if (typeof ingredients === 'object') {
    groupItems.push({
      id: DEFAULT_GROUP.id,
      name: DEFAULT_GROUP.name,
      position: DEFAULT_GROUP.position,
      ingredients: getIngredientsWithoutGroup(ingredients),
    });
  }

  if (typeof ingredients === 'object' && typeof groups === 'object') {
    groupItems = [
      ...groupItems,
      ...getGroupsWithTheirIngredients(groups, ingredients),
    ];
  }

  groupItems = groupItems.map(group => ({
    ...group,
    ingredients: sortItemsByPosition(group.ingredients),
  }));

  return sortItemsByPosition(groupItems);
};

export const sortGroupIdsByPosition = (groups: Groups | null) => {
  if (!groups) {
    return [];
  }

  return Object
    .keys(groups)
    .sort((keyA, keyB) => {
      const groupA = groups[keyA];
      const groupB = groups[keyB];

      if (!groupA || !groupB) {
        return 0;
      }

      return groupA.position - groupB.position;
    });
};

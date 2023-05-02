import { Groups, RecipeIngredients, GroupWithIngredients } from '../types/recipe';
import { generateKey } from './firebase.helpers';
import { getIngredientsByGroup } from './ingredient.helpers';

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

      const ingredientsInGroup = getIngredientsByGroup(key, ingredients);

      const groupWithIngredients: GroupWithIngredients = {
        id: key,
        ...group,
        ingredients: ingredientsInGroup,
      };

      groupsWithIngredients.push(groupWithIngredients);
    });

  return groupsWithIngredients;
};

export const generateGroupKey = (recipeId: string) => {
  const path = `recipes/${recipeId}/`;
  return generateKey(path);
};

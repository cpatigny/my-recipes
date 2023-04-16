import { GroupWithIngredients, Groups, RecipeIngredients } from '../../types/recipe';
import getIngredientsByGroup from '../ingredients/getIngredientsByGroup';

const getGroupsWithTheirIngredients = (groups: Groups, ingredients: RecipeIngredients) => {
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

export default getGroupsWithTheirIngredients;

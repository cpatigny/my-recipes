import { Ingredients } from '../../types/recipe';

const addGroupIdToIngredients = (
  groupId: string, ingredientsId: string[], ingredients: Ingredients,
) => {
  const groupedIngredients: Ingredients = {};

  ingredientsId.forEach(id => {
    const ingredient = ingredients[id];
    if (!ingredient) return;
    groupedIngredients[id] = {
      ...ingredient,
      groupId,
    };
  });

  return groupedIngredients;
};

export default addGroupIdToIngredients;

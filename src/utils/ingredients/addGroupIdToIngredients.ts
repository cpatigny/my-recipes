import { RecipeIngredients } from '../../types/recipe';

const addGroupIdToIngredients = (
  groupId: string, ingredientsId: string[], ingredients: RecipeIngredients,
) => {
  const groupedIngredients: RecipeIngredients = {};

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

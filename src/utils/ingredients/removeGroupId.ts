import { RecipeIngredients } from '../../types/recipe';

const removeGroupId = (ingredients: RecipeIngredients) => {
  const updatedIngredients: RecipeIngredients = {};

  Object
    .keys(ingredients)
    .forEach(key => {
      const ingredient = ingredients[key];
      if (!ingredient) return;
      updatedIngredients[key] = { ...ingredient, groupId: false };
    });

  return updatedIngredients;
};

export default removeGroupId;

import { Ingredients } from '../../types/recipe';

const removeGroupId = (ingredients: Ingredients) => {
  const updatedIngredients: Ingredients = {};

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

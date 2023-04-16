import { RecipeIngredientWithId, RecipeIngredients } from '../../types/recipe';

const getIngredientsByGroup = (groupId: string, ingredients: RecipeIngredients) => {
  const matchingIngredients: RecipeIngredientWithId[] = [];

  Object
    .keys(ingredients)
    .filter(key => ingredients[key]?.groupId === groupId)
    .forEach(key => {
      const ingredient = ingredients[key];
      if (!ingredient) return;
      matchingIngredients.push({ id: key, ...ingredient });
    });

  return matchingIngredients;
};

export default getIngredientsByGroup;

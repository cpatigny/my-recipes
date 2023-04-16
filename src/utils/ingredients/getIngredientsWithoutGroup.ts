import { RecipeIngredientWithId, RecipeIngredients } from '../../types/recipe';

const getIngredientsWithoutGroup = (ingredients: RecipeIngredients) => {
  const ingredientsWithoutGroup: RecipeIngredientWithId[] = [];

  Object
    .keys(ingredients)
    .filter(key => typeof ingredients[key]?.groupId !== 'string')
    .forEach(key => {
      const ingredient = ingredients[key];
      if (!ingredient) return;
      ingredientsWithoutGroup.push({ ...ingredient, id: key });
    });

  return ingredientsWithoutGroup;
};

export default getIngredientsWithoutGroup;

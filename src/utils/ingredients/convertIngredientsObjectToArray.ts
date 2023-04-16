import { RecipeIngredientWithId, RecipeIngredients } from '../../types/recipe';

const convertIngredientsObjectToArray = (ingredients: RecipeIngredients) => {
  const ingredientsArray: RecipeIngredientWithId[] = [];

  Object
    .keys(ingredients)
    .forEach(key => {
      const ingredient = ingredients[key];
      if (!ingredient) return;
      ingredientsArray.push({ id: key, ...ingredient });
    });

  return ingredientsArray;
};

export default convertIngredientsObjectToArray;

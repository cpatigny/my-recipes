import { IngredientWithId, Ingredients } from '../../types/recipe';

const convertIngredientsObjectToArray = (ingredients: Ingredients) => {
  const ingredientsArray: IngredientWithId[] = [];

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

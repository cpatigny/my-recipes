import { IngredientWithId, Ingredients } from '../../types/recipe';

const convertIngredientsArrayToObject = (ingredients: IngredientWithId[]) => {
  const ingredientsObject: Ingredients = {};

  ingredients.forEach(i => {
    const { id, ...ingredient } = i;
    ingredientsObject[id] = ingredient;
  });

  return ingredientsObject;
};

export default convertIngredientsArrayToObject;

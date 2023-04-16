import { RecipeIngredientWithId, RecipeIngredients } from '../../types/recipe';

const convertIngredientsArrayToObject = (ingredients: RecipeIngredientWithId[]) => {
  const ingredientsObject: RecipeIngredients = {};

  ingredients.forEach(i => {
    const { id, ...ingredient } = i;
    ingredientsObject[id] = ingredient;
  });

  return ingredientsObject;
};

export default convertIngredientsArrayToObject;

import { Recipe } from '../../types/recipe';

const recipeUsesIngredientDetails = (ingredientDetailsId: string, recipe: Recipe) => {
  const ingredients = recipe.ingredients;

  if (typeof ingredients === 'string') {
    return false;
  }

  return Object
    .keys(ingredients)
    .some(key => {
      const ingredient = ingredients[key];
      if (!ingredient) return false;
      return ingredient.detailsId === ingredientDetailsId;
    });
};

export default recipeUsesIngredientDetails;

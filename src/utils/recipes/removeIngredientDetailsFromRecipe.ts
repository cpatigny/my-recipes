import { Recipe } from '../../types/recipe';

const removeIngredientDetailsFromRecipe = (recipe: Recipe, ingredientDetailsId: string) => {
  if (typeof recipe.ingredients === 'string') {
    return recipe;
  }

  const updatedRecipe: Recipe = { ...recipe };
  const updatedIngredients = { ...recipe.ingredients };

  Object
    .keys(updatedIngredients)
    .forEach(key => {
      const ingredient = updatedIngredients[key];
      if (!ingredient) return;

      if (ingredient.detailsId === ingredientDetailsId) {
        delete updatedIngredients[key];
      }
    });

  updatedRecipe.ingredients = { ...updatedIngredients };

  return updatedRecipe;
};

export default removeIngredientDetailsFromRecipe;

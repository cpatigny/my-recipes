import { Recipe, RecipeIngredient } from '../../types/recipe';

const removeValuefromRecipeIngredients = (
  recipe: Recipe, property: keyof RecipeIngredient, id: string,
) => {
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

      if (ingredient[property] === id) {
        delete updatedIngredients[key];
      }
    });

  updatedRecipe.ingredients = { ...updatedIngredients };

  return updatedRecipe;
};

export default removeValuefromRecipeIngredients;

import { Recipe, RecipeIngredient } from '../../types/recipe';

const recipeUses = (recipe: Recipe, id: string, property: keyof RecipeIngredient) => {
  const ingredients = recipe.ingredients;

  if (typeof ingredients === 'string') {
    return false;
  }

  return Object
    .keys(ingredients)
    .some(key => {
      const ingredient = ingredients[key];
      if (!ingredient) return false;
      return ingredient[property] === id;
    });
};

export default recipeUses;

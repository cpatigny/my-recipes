import { Recipe } from '../../types/recipe';

const removeUnitFromRecipe = (recipe: Recipe, unitId: string) => {
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

      if (ingredient.unitId === unitId) {
        delete updatedIngredients[key];
      }
    });

  updatedRecipe.ingredients = { ...updatedIngredients };

  return updatedRecipe;
};

export default removeUnitFromRecipe;

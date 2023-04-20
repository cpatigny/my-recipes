import { IngredientsDetails } from '../../types/ingredientDetails';
import { RecipeIngredientWithId, RecipeIngredient } from '../../types/recipe';

const getIngredientSingular = (
  ingredient: RecipeIngredientWithId | RecipeIngredient,
  ingredientsDetails: IngredientsDetails | null,
) => {
  if (!ingredientsDetails) return '';
  const details = ingredientsDetails[ingredient.detailsId];
  if (!details) return '';
  return details.singular;
};

export default getIngredientSingular;

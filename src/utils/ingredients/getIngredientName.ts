import { IngredientsDetails } from '../../types/ingredientDetails';
import { RecipeIngredientWithId, RecipeIngredient } from '../../types/recipe';

const getIngredientName = (
  ingredient: RecipeIngredientWithId | RecipeIngredient,
  ingredientsDetails: IngredientsDetails | null,
) => {
  if (!ingredientsDetails) return '';

  const details = ingredientsDetails[ingredient.detailsId];
  if (!details) return '';

  const quantity = ingredient.quantity;
  if (quantity && quantity > 1) {
    return details.plural;
  }

  return details.singular;
};

export default getIngredientName;

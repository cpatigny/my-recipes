import { GroupWithId, RecipeIngredients } from '../../types/recipe';
import getIngredientsByGroup from './getIngredientsByGroup';

/**
 * @param group the group the user is editing but not yet updated
 * @param selectedIngredientsId the list of ingredients id the user selected (checked)
 * @param ingredients the list of all ingredients
 * @returns the list of ingredients that got removed from a group
 */
const getExcludedIngredients = (
  group: GroupWithId, selectedIngredientsId: string[], ingredients: RecipeIngredients,
) => {
  const excludedIngredients: RecipeIngredients = {};
  const groupIngredients = getIngredientsByGroup(group.id, ingredients);

  groupIngredients
    .filter(ingredient => !selectedIngredientsId.includes(ingredient.id))
    .forEach(ingredient => {
      const { id, ...ingredientData } = ingredient;
      excludedIngredients[id] = ingredientData;
    });

  return excludedIngredients;
};

export default getExcludedIngredients;

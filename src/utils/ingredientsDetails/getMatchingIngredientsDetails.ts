import { IngredientDetailsWithId, IngredientsDetails } from '../../types/ingredientDetails';
import strContains from '../string/strContains';

const getMatchingIngredientsDetails = (
  search: string, ingredientsDetails: IngredientsDetails | null,
) => {
  if (!ingredientsDetails) {
    return [];
  }

  const matchingIngredientsDetails: IngredientDetailsWithId[] = [];

  Object
    .keys(ingredientsDetails)
    .filter(key => {
      const ingredientDetails = ingredientsDetails[key];
      if (!ingredientDetails) return false;
      const singularContainsSearch = strContains(ingredientDetails.singular, search);
      const pluralContainsSearch = strContains(ingredientDetails.plural, search);
      return singularContainsSearch || pluralContainsSearch;
    })
    .forEach(key => {
      const ingredientDetails = ingredientsDetails[key];
      if (!ingredientDetails) return;
      matchingIngredientsDetails.push({ id: key, ...ingredientDetails });
    });

  return matchingIngredientsDetails;
};

export default getMatchingIngredientsDetails;

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
    .forEach(key => {
      const ingredientDetails = ingredientsDetails[key];
      if (!ingredientDetails) return;
      const singularContainsSearch = strContains(ingredientDetails.singular, search);
      const pluralContainsSearch = strContains(ingredientDetails.plural, search);
      if (singularContainsSearch || pluralContainsSearch) {
        matchingIngredientsDetails.push({ id: key, ...ingredientDetails });
      }
    });

  return matchingIngredientsDetails;
};

export default getMatchingIngredientsDetails;

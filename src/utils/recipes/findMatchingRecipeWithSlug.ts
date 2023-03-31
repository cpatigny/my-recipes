import { RecipeWithId, Recipes } from '../../types/recipe';

const findMatchingRecipeWithSlug = (slug: string, recipes: Recipes): RecipeWithId | null => {
  if (!recipes) return null;

  const recipeKey = Object
    .keys(recipes)
    .filter(key => recipes[key]?.slug === slug)[0];

  // no match, the list doesn't exist
  if (!recipeKey) return null;

  const matchingRecipe = recipes[recipeKey];

  // matching recipe
  if (!matchingRecipe) return null;

  return {
    ...matchingRecipe,
    id: recipeKey,
  };
};

export default findMatchingRecipeWithSlug;

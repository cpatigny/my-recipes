import { RecipeWithId, Recipes } from '../../types/recipe';

const getRecipeBySlug = (slug: string, recipes: Recipes): RecipeWithId | null => {
  if (!recipes) return null;

  const recipeKey = Object
    .keys(recipes)
    .find(key => recipes[key]?.slug === slug);

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

export default getRecipeBySlug;

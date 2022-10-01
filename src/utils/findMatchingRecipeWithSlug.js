const findMatchingRecipeWithSlug = (slug, recipes) => {
  if (!recipes) return null;

  const recipeKey = Object
    .keys(recipes)
    .filter(key => recipes[key].slug === slug)[0];

  // no match, the list doesn't exist
  if (!recipeKey) return null;

  // matching recipe
  return {
    ...recipes[recipeKey],
    id: recipeKey,
  };
};

export default findMatchingRecipeWithSlug;

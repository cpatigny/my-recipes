import strContains from './strContains';

const searchMatchingRecipes = (search, recipes) => {
  let matchingRecipes = {};

  Object
    .keys(recipes)
    .filter(key => strContains(recipes[key].title, search))
    .forEach(key => {
      matchingRecipes[key] = recipes[key];
    });

  if (Object.keys(matchingRecipes).length === 0) matchingRecipes = null;

  return matchingRecipes;
};

export default searchMatchingRecipes;

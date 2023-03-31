import { Recipes } from '../../types/recipe';

/**
 * Reverse the order of the recipes
 */
const reverseRecipes = (recipes: Recipes): Recipes => {
  const reversedObject: Recipes = {};

  Object
    .keys(recipes)
    .reverse()
    .forEach(key => {
      const object = recipes[key];

      if (object) {
        reversedObject[key] = object;
      }
    });

  return reversedObject;
};

export default reverseRecipes;

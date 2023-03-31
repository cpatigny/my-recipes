import { Recipes } from '../../types/recipe';
import strContains from '../string/strContains';

const searchMatchingRecipes = (search: string, recipes: Recipes): Recipes | null => {
  const matchingRecipes: Recipes = {};

  Object
    .keys(recipes)
    .filter(key => {
      const recipe = recipes[key];
      if (!recipe) return false;
      return strContains(recipe.title, search);
    })
    .forEach(key => {
      const recipe = recipes[key];
      if (recipe) matchingRecipes[key] = recipe;
    });

  const noMatch = Object.keys(matchingRecipes).length === 0;

  return noMatch ? null : matchingRecipes;
};

export default searchMatchingRecipes;

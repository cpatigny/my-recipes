import { Recipes } from '../../types/recipe';
import strContains from '../string/strContains';

const searchMatchingRecipes = (search: string, recipes: Recipes): Recipes | null => {
  const matchingRecipes: Recipes = {};

  Object
    .keys(recipes)
    .forEach(key => {
      const recipe = recipes[key];
      if (!recipe) return;
      if (strContains(recipe.title, search)) {
        matchingRecipes[key] = recipe;
      }
    });

  const noMatch = Object.keys(matchingRecipes).length === 0;

  return noMatch ? null : matchingRecipes;
};

export default searchMatchingRecipes;

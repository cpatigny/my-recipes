import { Recipes } from '../types/recipe';

const getRecipesByCategory = (recipes: Recipes, categoryId: string): Recipes | null => {
  const recipesWithCategory: Recipes = {};

  Object
    .keys(recipes)
    .filter(key => recipes[key]?.category === categoryId)
    .forEach(key => {
      const recipe = recipes[key];
      if (recipe) recipesWithCategory[key] = recipe;
    });

  const noMatch = Object.keys(recipesWithCategory).length === 0;

  return noMatch ? null : recipesWithCategory;
};

export default getRecipesByCategory;

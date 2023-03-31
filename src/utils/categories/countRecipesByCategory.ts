import { Recipes } from '../../types/recipe';

const countRecipesByCategory = (recipes: Recipes, categoryId: string) => {
  let count = 0;

  Object
    .keys(recipes)
    .forEach(key => {
      const recipe = recipes[key];
      if (recipe?.category === categoryId) count++;
    });

  return count;
};

export default countRecipesByCategory;

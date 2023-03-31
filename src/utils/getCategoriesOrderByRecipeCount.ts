import { Categories, CategoryWithId } from '../types/category';
import { Recipes } from '../types/recipe';
import countRecipesByCategory from './countRecipesByCategory';

const getCategoriesOrderByRecipeCount = (categories: Categories, recipes: Recipes) => {
  const categoriesOrderByRecipeCount: CategoryWithId[] = Object
    .keys(categories)
    .sort((keyA, keyB) => {
      const a = countRecipesByCategory(recipes, keyA);
      const b = countRecipesByCategory(recipes, keyB);
      return b - a;
    })
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map(key => ({ id: key, name: categories[key]! }));

  return categoriesOrderByRecipeCount;
};

export default getCategoriesOrderByRecipeCount;

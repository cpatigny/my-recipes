import { Categories as CategoriesType } from '../../types/category';
import { Recipes } from '../../types/recipe';
import { DEFAULT_CATEGORY_ID } from './Home';
import countRecipesByCategory from '../../utils/categories/countRecipesByCategory';
import getCategoriesOrderByRecipeCount from '../../utils/categories/getCategoriesOrderByRecipeCount';

import Category from './Category';

interface CategoriesProps {
  categories: CategoriesType | null;
  selectedCategoryId: string;
  selectCategory: (id: string) => void;
  recipes: Recipes | null;
}

const Categories = ({
  categories, selectedCategoryId, selectCategory, recipes,
}: CategoriesProps) => {
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    const maxScroll = Math.floor(scrollLeft) === scrollWidth - clientWidth;

    if (maxScroll) {
      e.currentTarget.classList.add('max-scroll');
    } else {
      e.currentTarget.classList.remove('max-scroll');
    }
  };

  if (!categories || !recipes) return null;

  const categoriesOrderByRecipeCount = getCategoriesOrderByRecipeCount(categories, recipes);
  const defaultCategoryIsSelected = selectedCategoryId === DEFAULT_CATEGORY_ID;

  return (
    <div className='categories'>
      <div className='wrapper' onScroll={handleScroll}>
        <div className='gradient'></div>

        <Category id={DEFAULT_CATEGORY_ID} name='Tout' selected={defaultCategoryIsSelected} selectCategory={selectCategory} />

        { categoriesOrderByRecipeCount.map(category => {
          const { id, name } = category;
          if (countRecipesByCategory(recipes, id) === 0) return null;
          return (
            <Category
              key={id}
              id={id}
              name={name}
              selected={selectedCategoryId === id}
              selectCategory={selectCategory}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Categories;

import { Categories as CategoriesType } from '../../types/category';
import { Recipes } from '../../types/recipe';
import { DEFAULT_CATEGORY_ID } from './Home';
import countRecipesByCategory from '../../utils/countRecipesByCategory';

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

  const defaultCategoryIsSelected = selectedCategoryId === DEFAULT_CATEGORY_ID;

  return (
    <div className='categories'>
      <div className='wrapper' onScroll={handleScroll}>
        <div className='gradient'></div>

        <Category id={DEFAULT_CATEGORY_ID} name='Tout' selected={defaultCategoryIsSelected} selectCategory={selectCategory} />

        { Object.keys(categories).map(categoryKey => {
          const name = categories[categoryKey];
          if (!name) return null;
          if (countRecipesByCategory(recipes, categoryKey) === 0) return null;
          return (
            <Category
              key={categoryKey}
              id={categoryKey}
              name={name}
              selected={selectedCategoryId === categoryKey}
              selectCategory={selectCategory}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Categories;

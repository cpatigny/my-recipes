import { Categories as CategoriesType, CategoryWithId } from '../../types/category';
import { Recipes } from '../../types/recipe';
import { ROUTES } from '../../routes';
import { getCategoriesOrderByRecipeCount, countRecipesByCategory } from '../../helpers/category.helpers';

import Category from './Category';
import { Link } from 'react-router-dom';

interface CategoriesProps {
  categories: CategoriesType | null;
  selectedCategory: CategoryWithId | null;
  recipes: Recipes | null;
}

const DEFAULT_HOME_CATEGORY = {
  id: '0',
  name: 'Tout',
};

const Categories = ({ categories, selectedCategory, recipes }: CategoriesProps) => {
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
  const noCategroySelected = selectedCategory === null;

  return (
    <div className='categories'>
      <div className='wrapper' onScroll={handleScroll}>
        <div className='gradient'></div>

        <Link to={ROUTES.HOME} className={`category ${noCategroySelected ? 'selected' : ''}`}>
          { DEFAULT_HOME_CATEGORY.name }
        </Link>

        { categoriesOrderByRecipeCount.map(category => {
          if (countRecipesByCategory(recipes, category.id) === 0) return null;
          return (
            <Category
              key={category.id}
              category={category}
              selected={selectedCategory?.id === category.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Categories;

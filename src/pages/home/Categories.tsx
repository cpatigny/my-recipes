import { useState } from 'react';
import { Categories as CategoriesType, CategoryWithId } from '../../types/category';
import { Recipes } from '../../types/recipe';
import { ROUTES } from '../../routes';
import { getCategoriesOrderByRecipeCount, countRecipesByCategory } from '../../helpers/category.helpers';
import { css } from '../../../styled-system/css';
import { wrap } from '../../../styled-system/patterns';

import { Category } from './Category';
import { Link } from 'react-router-dom';

const categoryStyles = css({
  bg: 'white',
  p: { base: '0.375rem 1.25rem', md: '0.425rem 1.5rem' },
  color: '#909090',
  transitionDuration: '300ms',
  rounded: 'full',
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
  whiteSpace: 'nowrap',
  fontSize: { base: '0.9rem', md: '1rem' },
  mb: '2px', // same as box shadow
  _hover: {
    '&[data-selected=false]': {
      bg: 'orange.100',
    },
  },
  '&[data-selected=true]': {
    bg: 'orange.400',
    color: 'white',
  },
});

interface CategoriesProps {
  categories: CategoriesType | null;
  selectedCategory: CategoryWithId | null;
  recipes: Recipes | null;
}

const DEFAULT_HOME_CATEGORY = {
  id: '0',
  name: 'Tout',
};

export const Categories = ({ categories, selectedCategory, recipes }: CategoriesProps) => {
  const [isMaxScroll, setIsMaxScroll] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    const maxScroll = Math.floor(scrollLeft) + 5 >= scrollWidth - clientWidth;
    setIsMaxScroll(maxScroll);
  };

  if (!categories || !recipes) return null;

  const categoriesOrderByRecipeCount = getCategoriesOrderByRecipeCount(categories, recipes);
  const noCategroySelected = selectedCategory === null;

  return (
    <div
      className={css({
        mb: '1.875rem',
        pos: 'relative',
      })}
    >
      <div
        onScroll={handleScroll}
        className={wrap({
          align: 'center',
          gap: { base: '0.625rem', md: '0.625rem 1rem' },
          '@media (hover: none) and (pointer: coarse)': {
            flexWrap: 'nowrap',
            overflowX: 'auto',
            MsOverflowStyle: 'none', // IE and Edge
            scrollbarWidth: 'none', // Firefox

            // Chrome, Safari and Opera
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },
        })}
      >
        {!isMaxScroll && (
          <div
            className={css({
              pos: 'absolute',
              top: '0',
              bottom: '0',
              right: '0',
              w: '1.5625rem',
              bg: 'linear-gradient(90deg, rgba(247,247,247,0) 0%, rgba(247,247,247,1) 100%)',
            })}
          />
        )}

        <Link
          to={ROUTES.HOME}
          className={categoryStyles}
          data-selected={noCategroySelected}
        >
          { DEFAULT_HOME_CATEGORY.name }
        </Link>

        { categoriesOrderByRecipeCount.map(category => {
          if (countRecipesByCategory(recipes, category.id) === 0) return null;
          return (
            <Category
              key={category.id}
              category={category}
              selected={selectedCategory?.id === category.id}
              className={categoryStyles}
            />
          );
        })}
      </div>
    </div>
  );
};

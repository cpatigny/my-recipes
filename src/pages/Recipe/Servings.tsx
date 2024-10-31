import { useEffect } from 'react';
import { RecipeWithId } from '../../types/recipe';
import { css, cx } from '../../../styled-system/css';

import { Icon } from '../../components/Icon';
import { button } from '../../recipes/button';
import { ShoppingListRecipeWithId } from '../../types/shoppingList';

interface ServingsProps {
  numberOfServings: number;
  setNumberOfServings: React.Dispatch<React.SetStateAction<number>>;
  recipe: ShoppingListRecipeWithId | RecipeWithId;
  className?: string;
  incrementStorageServingsNb?: (recipeId: string) => void;
  decrementStorageServingsNb?: (recipeId: string) => void;
}

export const Servings = ({
  numberOfServings,
  setNumberOfServings,
  recipe,
  className,
  incrementStorageServingsNb,
  decrementStorageServingsNb,
}: ServingsProps) => {
  useEffect(() => {
    setNumberOfServings(
      'shoppingListServingsNb' in recipe
        ? recipe.shoppingListServingsNb
        : Number(recipe.nbServings),
    );
  }, [recipe, recipe.nbServings, setNumberOfServings]);

  const decrementNumberOfServings = () => {
    if (decrementStorageServingsNb) {
      decrementStorageServingsNb(recipe.id);
    }
    setNumberOfServings(prev => {
      if (prev === 1) return 1;
      return prev - 1;
    });
  };

  const incrementNumberOfServings = () => {
    if (incrementStorageServingsNb) {
      incrementStorageServingsNb(recipe.id);
    }
    setNumberOfServings(prev => prev + 1);
  };

  return (
    <div
      className={cx(
        className,
        css({
          display: 'inline-flex',
          alignItems: 'center',
          m: '1.5rem 0 1.2rem',
        }),
      )}
    >
      <button
        onClick={decrementNumberOfServings}
        data-disabled={numberOfServings <= 1}
        className={cx(button({ circle: true }), css({ bg: 'orange.400' }))}
      >
        <Icon name='remove' fontSize='1.4rem' />
      </button>
      <p className={css({ mx: '0.3rem', px: '0.6rem', fontSize: '1.2rem' })}>
        <b>{numberOfServings} </b>
        <b>{recipe.servingsUnit}</b>
      </p>
      <button
        onClick={incrementNumberOfServings}
        className={cx(button({ circle: true }), css({ bg: 'orange.400' }))}
      >
        <Icon name='add' fontSize='1.4rem' />
      </button>
    </div>
  );
};

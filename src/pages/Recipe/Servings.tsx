import { useEffect } from 'react';
import { RecipeWithId } from '../../types/recipe';
import { css, cx } from '../../../styled-system/css';

import { Icon } from '../../components/Icon/Icon';
import { button } from '../../recipes/button';

interface ServingsProps {
  numberOfServings: number;
  setNumberOfServings: React.Dispatch<React.SetStateAction<number>>;
  recipe: RecipeWithId;
}

export const Servings = ({ numberOfServings, setNumberOfServings, recipe }: ServingsProps) => {
  useEffect(() => {
    setNumberOfServings(Number(recipe.nbServings));
  }, [recipe.nbServings, setNumberOfServings]);

  const decrementNumberOfServings = () => {
    setNumberOfServings(prev => {
      if (prev === 1) return 1;
      return prev - 1;
    });
  };

  return (
    <div
      className={css({
        display: 'inline-flex',
        alignItems: 'center',
        m: '1.5rem 0 1.2rem',
      })}
    >
      <button
        onClick={decrementNumberOfServings}
        data-disabled={numberOfServings <= 1}
        className={cx(
          button({ circle: true }),
          css({ bg: 'orange.400' }),
        )}
      >
        <Icon name='remove' className={css({ fontSize: '1.4rem!' })} />
      </button>
      <p className={css({ mx: '0.3rem', px: '0.6rem', fontSize: '1.2rem' })}>
        <b>{ numberOfServings } </b>
        <b>{ recipe.servingsUnit }</b>
      </p>
      <button
        onClick={() => setNumberOfServings(prev => prev + 1)}
        className={cx(
          button({ circle: true }),
          css({ bg: 'orange.400' }),
        )}
      >
        <Icon name='add' className={css({ fontSize: '1.4rem!' })} />
      </button>
    </div>
  );
};

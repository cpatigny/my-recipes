import { useEffect } from 'react';
import { RecipeWithId } from '../../types/recipe';

import { Icon } from '../../components/Icon/Icon';

interface ServingsProps {
  numberOfServings: number;
  setNumberOfServings: React.Dispatch<React.SetStateAction<number>>;
  recipe: RecipeWithId;
}

export const Servings = ({ numberOfServings, setNumberOfServings, recipe }: ServingsProps) => {
  useEffect(() => {
    setNumberOfServings(recipe.nbServings ? Number(recipe.nbServings) : 0);
  }, [recipe.nbServings, setNumberOfServings]);

  const decrementNumberOfServings = () => {
    setNumberOfServings(prev => {
      if (prev === 1) return 1;
      return prev - 1;
    });
  };

  return (
    <div className='servings'>
      <button className={numberOfServings <= 1 ? 'disabled' : ''} onClick={decrementNumberOfServings}>
        <Icon name='remove' />
      </button>
      <p className='number-servings'>
        <b>{ numberOfServings } </b>
        <b>{ recipe.servingsUnit }</b>
      </p>
      <button onClick={() => setNumberOfServings(prev => prev + 1)}>
        <Icon name='add' />
      </button>
    </div>
  );
};

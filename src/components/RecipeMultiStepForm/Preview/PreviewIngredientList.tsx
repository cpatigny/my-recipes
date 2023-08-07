import { useIngredientsDetails } from '../../../contexts/IngredientsDetailsContext';
import { useUnits } from '../../../contexts/UnitsContext';
import { RecipeIngredientWithId } from '../../../types/recipe';
import { css } from '../../../../styled-system/css';

import { PreviewIngredientItem } from './PreviewIngredientItem';

interface PreviewIngredientListProps {
  ingredients: RecipeIngredientWithId[];
}

export const PreviewIngredientList = ({ ingredients }: PreviewIngredientListProps) => {
  const { ingredientsDetails } = useIngredientsDetails();
  const { units } = useUnits();

  return (
    <ul className={css({ pl: '2.4rem' })}>
      {ingredients.map(ingredient => (
        <PreviewIngredientItem
          key={ingredient.id}
          ingredient={ingredient}
          ingredientsDetails={ingredientsDetails}
          units={units}
        />
      ))}
    </ul>
  );
};

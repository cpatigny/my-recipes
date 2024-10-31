import { useIngredientsDetails } from '../../contexts/IngredientsDetailsContext';
import { useUnits } from '../../contexts/UnitsContext';
import { RecipeIngredientWithId } from '../../types/recipe';
import { css } from '../../../styled-system/css';

import { Ingredient } from './Ingredient';

interface IngredientListProps {
  ingredients: RecipeIngredientWithId[];
  servingRatio?: number;
}

export const IngredientList = ({
  ingredients,
  servingRatio,
}: IngredientListProps) => {
  const { ingredientsDetails } = useIngredientsDetails();
  const { units } = useUnits();

  return (
    <ul className={css({ py: '1rem' })}>
      {ingredients.map(ingredient => (
        <Ingredient
          key={ingredient.id}
          ingredient={ingredient}
          ingredientsDetails={ingredientsDetails}
          units={units}
          servingRatio={servingRatio}
        />
      ))}
    </ul>
  );
};

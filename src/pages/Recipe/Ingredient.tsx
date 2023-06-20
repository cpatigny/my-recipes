import { IngredientText } from '../../components/IngredientText/IngredientText';
import { IngredientsDetails } from '../../types/ingredientDetails';
import { RecipeIngredientWithId } from '../../types/recipe';
import { Units } from '../../types/unit';

import * as Checkbox from '@radix-ui/react-checkbox';

interface IngredientProps {
  ingredient: RecipeIngredientWithId;
  ingredientsDetails: IngredientsDetails | null;
  units: Units | null;
  servingRatio?: number;
}

export const Ingredient = ({
  ingredient, ingredientsDetails, units, servingRatio,
}: IngredientProps) => {
  return (
    <li className='checkbox-item'>
      <Checkbox.Root className='checkbox-root' id={ingredient.id}>
        <Checkbox.Indicator className='checkbox-indicator'>
          <div className='checkbox-check-icon'></div>
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className='checkbox-label' htmlFor={ingredient.id}>
        <IngredientText
          className='checkmark'
          ingredient={ingredient}
          ingredientsDetails={ingredientsDetails}
          units={units}
          servingRatio={servingRatio}
        />
      </label>
    </li>
  );
};

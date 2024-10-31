import { css } from '../../../../styled-system/css';
import { IngredientsDetails } from '../../../types/ingredientDetails';
import { RecipeIngredientWithId } from '../../../types/recipe';
import { Units } from '../../../types/unit';

import { IngredientText } from '../../IngredientText';

interface IngredientCheckboxProps {
  ingredient: RecipeIngredientWithId;
  checked: boolean;
  ingredientsDetails: IngredientsDetails | null;
  units: Units | null;
  handleCheck: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const IngredientCheckbox = ({
  ingredient,
  checked,
  ingredientsDetails,
  units,
  handleCheck,
}: IngredientCheckboxProps) => (
  <label className={css({ mt: '0.2rem' })}>
    <input
      type='checkbox'
      checked={checked}
      name={ingredient.id}
      value={ingredient.id}
      onChange={handleCheck}
      className={css({
        w: 'auto',
        m: '0 0.6rem 0 0',
        verticalAlign: 'middle',
        WebkitAppearance: 'checkbox',
      })}
    />
    <IngredientText
      ingredient={ingredient}
      ingredientsDetails={ingredientsDetails}
      units={units}
    />
  </label>
);

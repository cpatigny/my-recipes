import { IngredientsDetails } from '../../../types/ingredientDetails';
import { RecipeIngredientWithId } from '../../../types/recipe';
import { Units } from '../../../types/unit';

import { IngredientText } from '../../IngredientText/IngredientText';

interface IngredientCheckboxProps {
  ingredient: RecipeIngredientWithId;
  checked: boolean;
  ingredientsDetails: IngredientsDetails | null;
  units: Units | null;
  handleCheck: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const IngredientCheckbox = ({
  ingredient, checked, ingredientsDetails, units, handleCheck,
}: IngredientCheckboxProps) => (
  <label>
    <input
      type='checkbox'
      checked={checked}
      name={ingredient.id}
      value={ingredient.id}
      onChange={handleCheck}
    />
    <IngredientText
      ingredient={ingredient}
      ingredientsDetails={ingredientsDetails}
      units={units}
    />
  </label>
);

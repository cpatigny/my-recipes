import {
  getIngredientName,
  getPrepositionText,
  getQuantityText,
} from '../helpers/ingredient.helpers';
import { getUnitDetails, getUnitName } from '../helpers/units.helpers';
import { IngredientsDetails } from '../types/ingredientDetails';
import { RecipeIngredientWithId, RecipeIngredient } from '../types/recipe';
import { Units } from '../types/unit';
import { css } from '../../styled-system/css';

interface IngredientTextProps
  extends React.InputHTMLAttributes<HTMLSpanElement> {
  ingredient: RecipeIngredientWithId | RecipeIngredient;
  ingredientsDetails: IngredientsDetails | null;
  units: Units | null;
  amountIsBold?: boolean;
  servingRatio?: number;
  fontSize?: string;
}

export const IngredientText = ({
  ingredient,
  ingredientsDetails,
  units,
  amountIsBold = true,
  servingRatio,
  fontSize = '1.1rem',
  ...props
}: IngredientTextProps) => {
  if (!ingredientsDetails || !units) {
    return null;
  }

  let quantity = Number(ingredient.quantity); // 0 if false
  if (servingRatio) {
    quantity *= servingRatio;
  }

  const ingredientName = getIngredientName(
    ingredient,
    quantity,
    ingredientsDetails,
  );
  const unit = getUnitDetails(units, ingredient.unitId);
  const unitName = getUnitName(unit, quantity);
  const quantityText = getQuantityText(quantity);
  const prepositionText = getPrepositionText(ingredient.preposition);
  const additionalInfo = ingredient.additionalInfo
    ? ingredient.additionalInfo
    : '';

  let ingredientAmount = quantityText;
  ingredientAmount += ingredientAmount.length > 0 ? ` ${unitName}` : '';

  if (ingredientAmount.length === 0) {
    return (
      <span {...props} className={css({ fontSize })}>
        {`${ingredientName} ${additionalInfo}`}
      </span>
    );
  }

  return (
    <span {...props} className={css({ fontSize })}>
      {amountIsBold ? <b>{ingredientAmount}</b> : ingredientAmount}
      {` ${prepositionText}${ingredientName} ${additionalInfo}`}
    </span>
  );
};

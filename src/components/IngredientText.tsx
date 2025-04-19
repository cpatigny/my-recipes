import { css } from '../../styled-system/css';
import { getIngredientText } from '../helpers/ingredient.helpers';
import { IngredientsDetails } from '../types/ingredientDetails';
import { RecipeIngredient, RecipeIngredientWithId } from '../types/recipe';
import { Units } from '../types/unit';

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

  const { ingredientName, additionalInfo, ingredientAmount, prepositionText } =
    getIngredientText(ingredient, ingredientsDetails, units, servingRatio);

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

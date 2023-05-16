import { getIngredientName } from '../../helpers/ingredient.helpers';
import { getUnitDetails, getUnitName } from '../../helpers/units.helpers';
import { IngredientsDetails } from '../../types/ingredientDetails';
import { RecipeIngredientWithId, RecipeIngredient } from '../../types/recipe';
import { Units } from '../../types/unit';
import { lastCharIs } from '../../utils';

interface IngredientTextProps extends React.InputHTMLAttributes<HTMLSpanElement> {
  ingredient: RecipeIngredientWithId | RecipeIngredient;
  ingredientsDetails: IngredientsDetails | null;
  units: Units | null;
  amountIsBold?: boolean;
  servingRatio?: number | null;
}

const IngredientText = ({
  ingredient, ingredientsDetails, units, amountIsBold = true, servingRatio, ...props
}: IngredientTextProps) => {
  if (!ingredientsDetails || !units) {
    return null;
  }

  const ingredientName = getIngredientName(ingredient, ingredientsDetails);
  const unit = getUnitDetails(units, ingredient.unitId);
  const unitName = getUnitName(unit, Number(ingredient.quantity));
  let quantity = ingredient.quantity ? ingredient.quantity : '';

  if (ingredient.quantity && servingRatio) {
    quantity = ingredient.quantity * servingRatio;

    // round number to nearest decimal
    quantity = Math.round(quantity * 10) / 10;
  }

  let prepositionText = '';

  if (ingredient.preposition) {
    prepositionText = ingredient.preposition;
  }

  if (!lastCharIs(prepositionText, `'`)) {
    prepositionText = `${prepositionText} `; // add space
  }

  let ingredientAmount = `${quantity}`;
  ingredientAmount += ingredientAmount.length > 0 ? ` ${unitName}` : '';

  if (ingredientAmount.length === 0) {
    return <span {...props}>{ ingredientName }</span>;
  }

  return (
    <span {...props}>
      {amountIsBold ? (
        <b>{ ingredientAmount }</b>
      ) : (
        ingredientAmount
      )}
      {' '}
      { prepositionText }
      { ingredientName }
    </span>
  );
};

export default IngredientText;

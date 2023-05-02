import { getIngredientName } from '../../helpers/ingredient.helpers';
import { getUnitDetails, getUnitName } from '../../helpers/units.helpers';
import { IngredientsDetails } from '../../types/ingredientDetails';
import { RecipeIngredientWithId, RecipeIngredient } from '../../types/recipe';
import { Units } from '../../types/unit';

interface IngredientTextProps extends React.InputHTMLAttributes<HTMLSpanElement> {
  ingredient: RecipeIngredientWithId | RecipeIngredient;
  ingredientsDetails: IngredientsDetails | null;
  units: Units | null;
  amountIsBold?: boolean;
}

const IngredientText = ({
  ingredient, ingredientsDetails, units, amountIsBold = true, ...props
}: IngredientTextProps) => {
  if (!ingredientsDetails || !units) {
    return null;
  }

  const ingredientName = getIngredientName(ingredient, ingredientsDetails);
  const unit = getUnitDetails(units, ingredient.unitId);
  const unitName = getUnitName(unit, Number(ingredient.quantity));
  const quantity = ingredient.quantity ? ingredient.quantity : '';
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
      { ingredientName }
    </span>
  );
};

export default IngredientText;

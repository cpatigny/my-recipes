import { IngredientsDetails } from '../../types/ingredientDetails';
import { RecipeIngredientWithId } from '../../types/recipe';
import { Units } from '../../types/unit';
import getIngredientSingular from '../../utils/ingredientsDetails/getIngredientSingular';
import getUnitDetails from '../../utils/units/getUnitDetails';

interface PreviewIngredientItemProps {
  ingredient: RecipeIngredientWithId;
  ingredientsDetails: IngredientsDetails | null;
  units: Units | null;
}

const PreviewIngredientItem = ({
  ingredient, ingredientsDetails, units,
}: PreviewIngredientItemProps) => {
  const unit = getUnitDetails(units, ingredient.unitId);

  return (
    <li>
      { ingredient.quantity } { unit.symbol ?? unit.singular }
      <b>{ getIngredientSingular(ingredient, ingredientsDetails) }</b>
    </li>
  );
};

export default PreviewIngredientItem;

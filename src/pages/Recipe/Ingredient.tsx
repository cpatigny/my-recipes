import { IngredientsDetails } from '../../types/ingredientDetails';
import { Units } from '../../types/unit';
import getUnitDetails from '../../utils/units/getUnitDetails';

interface IngredientProps {
  ingredientsDetails: IngredientsDetails | null;
  units: Units | null;
  quantity: number | '';
  unitId?: string;
  detailsId: string;
}

const Ingredient = ({
  ingredientsDetails, units, quantity, unitId, detailsId,
}: IngredientProps) => {
  const details = ingredientsDetails && ingredientsDetails[detailsId];
  const unit = getUnitDetails(units, unitId);

  return (
    <li>
      <label className='checkbox-container'>
        <input type='checkbox' />
        <span className='checkmark'>
          <b>{ quantity } { unit.symbol ?? unit.singular }</b> { details ? details.singular : '' }
        </span>
      </label>
    </li>
  );
};

export default Ingredient;

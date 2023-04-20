import { useIngredientsDetails } from '../../providers/IngredientsDetailsProvider';

interface IngredientProps {
  quantity: number | '';
  unit: string;
  detailsId: string;
}

const Ingredient = ({ quantity, unit, detailsId }: IngredientProps) => {
  const { ingredientsDetails } = useIngredientsDetails();
  const details = ingredientsDetails && ingredientsDetails[detailsId];

  return (
    <li>
      <label className='checkbox-container'>
        <input type='checkbox' />
        <span className='checkmark'>
          <b>{ quantity } { unit }</b> { details ? details.singular : '' }
        </span>
      </label>
    </li>
  );
};

export default Ingredient;

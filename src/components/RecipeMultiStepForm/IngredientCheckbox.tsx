import { useIngredientsDetails } from '../../providers/IngredientsDetailsProvider';
import { RecipeIngredientWithId } from '../../types/recipe';

interface IngredientCheckboxProps {
  ingredient: RecipeIngredientWithId;
  checked: boolean;
  handleCheck: (e: React.FormEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const IngredientCheckbox = ({
  ingredient, checked, handleCheck, handleKeyDown,
}: IngredientCheckboxProps) => {
  const { ingredientsDetails } = useIngredientsDetails();
  const details = ingredientsDetails && ingredientsDetails[ingredient.detailsId];

  return (
    <label>
      <input
        type='checkbox'
        checked={checked}
        name={details ? details.singular : ''}
        value={ingredient.id}
        onChange={handleCheck}
        onKeyDown={handleKeyDown}
      />
      { details ? details.singular : '' }
    </label>
  );
};

export default IngredientCheckbox;

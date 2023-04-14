import { IngredientWithId } from '../../types/recipe';

interface IngredientCheckboxProps {
  ingredient: IngredientWithId;
  checked: boolean;
  handleCheck: (e: React.FormEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const IngredientCheckbox = ({
  ingredient, checked, handleCheck, handleKeyDown,
}: IngredientCheckboxProps) => (
  <label>
    <input
      type='checkbox'
      checked={checked}
      name={ingredient.name}
      value={ingredient.id}
      onChange={handleCheck}
      onKeyDown={handleKeyDown}
    />
    { ingredient.name }
  </label>
);

export default IngredientCheckbox;

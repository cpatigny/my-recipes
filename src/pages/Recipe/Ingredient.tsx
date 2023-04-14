interface IngredientProps {
  quantity: number | '';
  unit: string;
  name: string;
}

const Ingredient = ({ quantity, unit, name }: IngredientProps) => (
  <li>
    <label className='checkbox-container'>
      <input type='checkbox' />
      <span className='checkmark'>
        <b>{ quantity } { unit }</b> { name }
      </span>
    </label>
  </li>
);

export default Ingredient;

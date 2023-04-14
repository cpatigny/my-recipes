import { IngredientWithId } from '../../types/recipe';

import Ingredient from './Ingredient';

interface IngredientListProps {
  ingredients: IngredientWithId[];
}

const IngredientList = ({ ingredients }: IngredientListProps) => (
  <ul>
    {ingredients.map(ingredient => (
      <Ingredient key={ingredient.id} {...ingredient} />
    ))}
  </ul>
);

export default IngredientList;

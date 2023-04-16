import { RecipeIngredientWithId } from '../../types/recipe';

import Ingredient from './Ingredient';

interface IngredientListProps {
  ingredients: RecipeIngredientWithId[];
}

const IngredientList = ({ ingredients }: IngredientListProps) => (
  <ul>
    {ingredients.map(ingredient => (
      <Ingredient key={ingredient.id} {...ingredient} />
    ))}
  </ul>
);

export default IngredientList;

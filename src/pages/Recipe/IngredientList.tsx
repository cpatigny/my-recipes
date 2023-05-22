import { useIngredientsDetails } from '../../contexts/IngredientsDetailsContext';
import { useUnits } from '../../contexts/UnitsContext';
import { RecipeIngredientWithId } from '../../types/recipe';

import { Ingredient } from './Ingredient';

interface IngredientListProps {
  ingredients: RecipeIngredientWithId[];
  servingRatio?: number;
}

export const IngredientList = ({ ingredients, servingRatio }: IngredientListProps) => {
  const { ingredientsDetails } = useIngredientsDetails();
  const { units } = useUnits();

  return (
    <ul>
      {ingredients.map(ingredient => (
        <Ingredient
          key={ingredient.id}
          ingredient={ingredient}
          ingredientsDetails={ingredientsDetails}
          units={units}
          servingRatio={servingRatio}
        />
      ))}
    </ul>
  );
};

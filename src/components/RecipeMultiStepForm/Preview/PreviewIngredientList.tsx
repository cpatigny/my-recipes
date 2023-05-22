import { useIngredientsDetails } from '../../../contexts/IngredientsDetailsContext';
import { useUnits } from '../../../contexts/UnitsContext';
import { RecipeIngredientWithId } from '../../../types/recipe';

import { PreviewIngredientItem } from './PreviewIngredientItem';

interface PreviewIngredientListProps {
  ingredients: RecipeIngredientWithId[];
}

export const PreviewIngredientList = ({ ingredients }: PreviewIngredientListProps) => {
  const { ingredientsDetails } = useIngredientsDetails();
  const { units } = useUnits();

  return (
    <ul>
      {ingredients.map(ingredient => (
        <PreviewIngredientItem
          key={ingredient.id}
          ingredient={ingredient}
          ingredientsDetails={ingredientsDetails}
          units={units}
        />
      ))}
    </ul>
  );
};

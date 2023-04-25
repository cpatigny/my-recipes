import { useIngredientsDetails } from '../../providers/IngredientsDetailsProvider';
import { useUnits } from '../../providers/UnitsProvider';
import { RecipeIngredientWithId } from '../../types/recipe';

import PreviewIngredientItem from './PreviewIngredientItem';

interface PreviewIngredientListProps {
  ingredients: RecipeIngredientWithId[] | null;
}

const PreviewIngredientList = ({ ingredients }: PreviewIngredientListProps) => {
  const { ingredientsDetails } = useIngredientsDetails();
  const { units } = useUnits();

  return (
    <ul>
      {ingredients && ingredients.map(ingredient => (
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

export default PreviewIngredientList;

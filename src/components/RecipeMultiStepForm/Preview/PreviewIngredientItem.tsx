import { IngredientsDetails } from '../../../types/ingredientDetails';
import { RecipeIngredientWithId } from '../../../types/recipe';
import { Units } from '../../../types/unit';

import { IngredientText } from '../../IngredientText/IngredientText';

interface PreviewIngredientItemProps {
  ingredient: RecipeIngredientWithId;
  ingredientsDetails: IngredientsDetails | null;
  units: Units | null;
}

export const PreviewIngredientItem = ({
  ingredient, ingredientsDetails, units,
}: PreviewIngredientItemProps) => (
  <li>
    <IngredientText
      ingredient={ingredient}
      ingredientsDetails={ingredientsDetails}
      units={units}
    />
  </li>
);

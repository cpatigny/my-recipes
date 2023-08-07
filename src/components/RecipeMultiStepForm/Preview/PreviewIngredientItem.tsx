import { IngredientsDetails } from '../../../types/ingredientDetails';
import { RecipeIngredientWithId } from '../../../types/recipe';
import { Units } from '../../../types/unit';
import { css } from '../../../../styled-system/css';

import { IngredientText } from '../../IngredientText';

interface PreviewIngredientItemProps {
  ingredient: RecipeIngredientWithId;
  ingredientsDetails: IngredientsDetails | null;
  units: Units | null;
}

export const PreviewIngredientItem = ({
  ingredient, ingredientsDetails, units,
}: PreviewIngredientItemProps) => (
  <li className={css({ listStyleType: 'disc' })}>
    <IngredientText
      ingredient={ingredient}
      ingredientsDetails={ingredientsDetails}
      units={units}
    />
  </li>
);

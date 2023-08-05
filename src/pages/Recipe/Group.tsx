import { RecipeIngredientWithId } from '../../types/recipe';
import { css } from '../../../styled-system/css';

import { IngredientList } from './IngredientList';

interface GroupProps {
  name: string;
  ingredients: RecipeIngredientWithId[];
  servingRatio?: number;
}

export const Group = ({ name, ingredients, servingRatio }: GroupProps) => (
  <>
    <p className={css({ mt: '1.6rem' })}>{ name } :</p>
    <ul>
      <IngredientList ingredients={ingredients} servingRatio={servingRatio} />
    </ul>
  </>
);

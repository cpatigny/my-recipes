import { RecipeIngredientWithId } from '../../types/recipe';

import { IngredientList } from './IngredientList';

interface GroupProps {
  name: string;
  ingredients: RecipeIngredientWithId[];
  servingRatio?: number;
}

export const Group = ({ name, ingredients, servingRatio }: GroupProps) => (
  <>
    <p className='group-name'>{ name } :</p>
    <ul>
      <IngredientList ingredients={ingredients} servingRatio={servingRatio} />
    </ul>
  </>
);

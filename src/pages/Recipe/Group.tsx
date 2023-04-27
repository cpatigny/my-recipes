import { RecipeIngredientWithId } from '../../types/recipe';

import IngredientList from './IngredientList';

interface GroupProps {
  name: string;
  ingredients: RecipeIngredientWithId[];
}

const Group = ({ name, ingredients }: GroupProps) => (
  <>
    <p className='group-name'>{ name } :</p>
    <ul>
      <IngredientList ingredients={ingredients} />
    </ul>
  </>
);

export default Group;

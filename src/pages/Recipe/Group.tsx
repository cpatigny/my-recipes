import { IngredientWithId } from '../../types/recipe';

import IngredientList from './IngredientList';

interface GroupProps {
  name: string;
  ingredients: IngredientWithId[];
}

const Group = ({ name, ingredients }: GroupProps) => (
  <>
    <p>{ name } :</p>
    <ul>
      <IngredientList ingredients={ingredients} />
    </ul>
  </>
);

export default Group;

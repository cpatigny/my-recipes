import { useIngredientsDetails } from '../../providers/IngredientsDetailsProvider';
import { useUnits } from '../../providers/UnitsProvider';
import { RecipeIngredient, RecipeIngredientWithId } from '../../types/recipe';

import IngredientText from '../IngredientText/IngredientText';

interface IngredientListItemProps {
  id: string;
  ingredient: RecipeIngredient;
  deleteIngredient: (key: string) => void;
  showEditIngredientForm: (ingredient: RecipeIngredientWithId) => void;
}

const IngredientListItem = ({
  id, ingredient, deleteIngredient, showEditIngredientForm,
}: IngredientListItemProps) => {
  const { ingredientsDetails } = useIngredientsDetails();
  const { units } = useUnits();

  return (
    <li className='ingredient-list-item'>
      <IngredientText
        ingredient={ingredient}
        ingredientsDetails={ingredientsDetails}
        units={units}
        amountIsBold={false}
      />
      <button className='edit edit-ingredient' type='button' onClick={() => showEditIngredientForm({ ...ingredient, id })}>
        <span className='material-icons-round'>edit</span>
      </button>
      <button className='delete delete-ingredient' type='button' onClick={() => deleteIngredient(id)}>
        <span className='material-icons-round'>clear</span>
      </button>
    </li>
  );
};

export default IngredientListItem;

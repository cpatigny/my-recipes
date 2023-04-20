import { useIngredientsDetails } from '../../providers/IngredientsDetailsProvider';
import { RecipeIngredient, RecipeIngredientWithId } from '../../types/recipe';
import getIngredientSingular from '../../utils/ingredientsDetails/getIngredientSingular';

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

  return (
    <li className='ingredient-list-item'>
      <span>{ ingredient.quantity } { ingredient.unit }</span>
      { getIngredientSingular(ingredient, ingredientsDetails) }
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

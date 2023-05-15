import { useIngredientsDetails } from '../../../contexts/IngredientsDetailsContext';
import { useUnits } from '../../../contexts/UnitsContext';
import { RecipeIngredientWithId } from '../../../types/recipe';

import Icon from '../../Icon/Icon';
import IngredientText from '../../IngredientText/IngredientText';

interface IngredientListItemProps {
  id: string;
  ingredient: RecipeIngredientWithId;
  deleteIngredient: (key: string) => void;
  showEditIngredientForm: (ingredient: RecipeIngredientWithId) => void;
}

const IngredientListItem = ({
  ingredient, deleteIngredient, showEditIngredientForm,
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
      <button className='edit edit-ingredient' type='button' onClick={() => showEditIngredientForm({ ...ingredient, id: ingredient.id })}>
        <Icon name='edit' />
      </button>
      <button className='delete delete-ingredient' type='button' onClick={() => deleteIngredient(ingredient.id)}>
        <Icon name='clear' />
      </button>
    </li>
  );
};

export default IngredientListItem;

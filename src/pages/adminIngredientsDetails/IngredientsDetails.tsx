import {
  IngredientDetailsWithId, IngredientsDetails as IngredientsDetailsType,
} from '../../types/ingredientDetails';

import Icon from '../../components/Icon/Icon';

interface IngredientsDetailsProps {
  ingredients: IngredientsDetailsType;
  setIngredientToEdit: React.Dispatch<React.SetStateAction<IngredientDetailsWithId | null>>;
  handleDelete: (ingredientDetails: IngredientDetailsWithId) => void;
}

const IngredientsDetails = ({
  ingredients, setIngredientToEdit, handleDelete,
}: IngredientsDetailsProps) => (
  <ul className='admin-list'>
    {Object.keys(ingredients).map(key => {
      const ingredient = ingredients[key];
      if (!ingredient) return null;
      return (
        <li key={key} className='ingredient'>
          <div className='ingredient-name'>
            <p>singulier : <b>{ ingredient.singular }</b></p>
            <p>pluriel : <b>{ ingredient.plural }</b></p>
          </div>
          <div className='actions delete-edit'>
            <button className='edit' onClick={() => setIngredientToEdit({ id: key, ...ingredient })}>
              <Icon name='edit' />
            </button>
            <button className='delete' onClick={() => handleDelete({ id: key, ...ingredient })}>
              <Icon name='delete_outline' />
            </button>
          </div>
        </li>
      );
    })}
  </ul>
);

export default IngredientsDetails;

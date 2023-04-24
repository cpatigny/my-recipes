import {
  IngredientDetailsWithId, IngredientsDetails as IngredientsDetailsType,
} from '../../types/ingredientDetails';

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
              <span className='material-icons-round'>edit</span>
            </button>
            <button className='delete' onClick={() => handleDelete({ id: key, ...ingredient })}>
              <span className='material-icons-round'>delete_outline</span>
            </button>
          </div>
        </li>
      );
    })}
  </ul>
);

export default IngredientsDetails;

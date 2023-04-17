import { IngredientWithId, Ingredients as IngredientsType } from '../../types/ingredient';

interface IngredientsProps {
  ingredients: IngredientsType;
  setIngredientToEdit: React.Dispatch<React.SetStateAction<IngredientWithId | null>>;
}

const Ingredients = ({ ingredients, setIngredientToEdit }: IngredientsProps) => (
  <ul>
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
            {/* <button className='delete' onClick={}>
              <span className='material-icons-round'>delete_outline</span>
            </button> */}
          </div>
        </li>
      );
    })}
  </ul>
);

export default Ingredients;

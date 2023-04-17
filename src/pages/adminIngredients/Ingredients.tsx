import { Ingredients as IngredientsType } from '../../types/ingredient';

interface IngredientsProps {
  ingredients: IngredientsType;
}

const Ingredients = ({ ingredients }: IngredientsProps) => (
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
          <div className='actions'>

          </div>
        </li>
      );
    })}
  </ul>
);

export default Ingredients;

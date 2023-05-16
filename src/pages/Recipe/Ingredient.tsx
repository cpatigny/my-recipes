import IngredientText from '../../components/IngredientText/IngredientText';
import { IngredientsDetails } from '../../types/ingredientDetails';
import { RecipeIngredientWithId } from '../../types/recipe';
import { Units } from '../../types/unit';

interface IngredientProps {
  ingredient: RecipeIngredientWithId;
  ingredientsDetails: IngredientsDetails | null;
  units: Units | null;
  servingRatio: number | null;
}

const Ingredient = ({
  ingredient, ingredientsDetails, units, servingRatio,
}: IngredientProps) => {
  return (
    <li>
      <label className='checkbox-container'>
        <input type='checkbox' />
        <IngredientText
          className='checkmark'
          ingredient={ingredient}
          ingredientsDetails={ingredientsDetails}
          units={units}
          servingRatio={servingRatio}
        />
      </label>
    </li>
  );
};

export default Ingredient;

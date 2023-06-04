import { getRecipeImgUrl } from '../../helpers/firebase.helpers';
import { RecipeWithId } from '../../types/recipe';

interface RecipeImageProps {
  recipe: RecipeWithId;
}

export const RecipeImage = ({ recipe }: RecipeImageProps) => {
  if (!recipe.imageName) return null;

  return (
    <div className='recipe-image'>
      <img
        src={getRecipeImgUrl(recipe.imageName)}
        alt={recipe.title} />
    </div>
  );
};

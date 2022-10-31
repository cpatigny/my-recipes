import { RecipeWithId } from '../../types/recipe';

interface RecipeImageProps {
  recipe: RecipeWithId;
}

const RecipeImage = ({ recipe }: RecipeImageProps) => {
  if (!recipe.imageName) return null;

  return (
    <div className='recipe-image'>
      <img
        src={`https://firebasestorage.googleapis.com/v0/b/my-recipes-5f5d6.appspot.com/o/recipe-images%2F${recipe.imageName}?alt=media`}
        alt={recipe.title} />
    </div>
  );
};

export default RecipeImage;

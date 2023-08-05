import { css } from '../../../styled-system/css';
import { getRecipeImgUrl } from '../../helpers/firebase.helpers';
import { RecipeWithId } from '../../types/recipe';

interface RecipeImageProps {
  recipe: RecipeWithId;
}

export const RecipeImage = ({ recipe }: RecipeImageProps) => {
  if (!recipe.imageName) return null;

  return (
    <div className={css({ pos: 'relative', w: '100%', pb: '100%' })}>
      <img
        src={getRecipeImgUrl(recipe.imageName)}
        alt={recipe.title}
        className={css({
          pos: 'absolute',
          top: '0',
          left: '0',
          w: '100%',
          h: '100%',
          rounded: '2xl',
          objectFit: 'cover',
          objectPosition: 'center',
        })}
      />
    </div>
  );
};

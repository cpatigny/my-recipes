import { useEffect, useState } from 'react';
import { css } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';
import { getRecipeImgUrl } from '../../helpers/firebase.helpers';
import { RecipeWithId } from '../../types/recipe';
import { getRecipePath } from '../../routes';

import { Servings } from '../../pages/Recipe/Servings';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { Icon } from '../Icon';

const imgSize = '4rem';
const biggerImgSize = '5rem';

interface ShoppingListRecipeProps {
  recipe: RecipeWithId;
  deleteFromShoppingListAndNotify: (recipeId: string) => void;
  updateShoppingListItem: (recipeId: string, newServingsNb: number) => void;
}

export const ShoppingListRecipe = ({
  recipe, deleteFromShoppingListAndNotify, updateShoppingListItem,
}: ShoppingListRecipeProps) => {
  const [numberOfServings, setNumberOfServings] = useState(Number(recipe.nbServings));

  useEffect(() => {
    updateShoppingListItem(recipe.id, numberOfServings);
  }, [numberOfServings, recipe.id, updateShoppingListItem]);

  const imageName = recipe.imageName;

  return (
    <div
      className={flex({
        gap: { base: '0.7rem', xsm: '1rem' },
        bg: 'white',
        p: '0.8rem 0.6rem',
        rounded: 'xl',
        mb: '1rem',
        shadow: 'xs',
      })}
    >
      {imageName && (
        <img
          src={getRecipeImgUrl(imageName)}
          alt={recipe.title}
          className={css({
            alignSelf: 'center',
            w: { base: imgSize, xsm: biggerImgSize },
            h: { base: imgSize, xsm: biggerImgSize },
            minW: { base: imgSize, xsm: biggerImgSize },
            minH: { base: imgSize, xsm: biggerImgSize },
            objectFit: 'cover',
            rounded: 'xl',
          })}
        />
      )}
      <div className={flex({ direction: 'column', gap: '0.8rem' })}>
        <Link
          to={getRecipePath(recipe.slug)}
          state={{ hasClickedLink: true }}
          className={css({
            color: 'text',
            fontSize: { base: '1rem', xsm: '1.1rem' },
            fontWeight: '600',
            transitionDuration: '200ms',
            _hover: {
              color: 'primary',
            },
          })}
        >
          { recipe.title }
        </Link>
        <Servings
          recipe={recipe}
          numberOfServings={numberOfServings}
          setNumberOfServings={setNumberOfServings}
          className={css({
            m: '0!',
            '& button span': {
              fontSize: '1.1rem!',
            },
            '& p': {
              fontSize: { base: '0.9rem', xsm: '1rem' },
            },
          })}
        />
      </div>
      <div className={css({ ml: 'auto' })}>
        <Button
          circle={true}
          onClick={() => deleteFromShoppingListAndNotify(recipe.id)}
        >
          <Icon name='delete_outline' fontSize='1.3rem' />
        </Button>
      </div>
    </div>
  );
};

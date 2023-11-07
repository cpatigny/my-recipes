import { css, cx } from '../../../styled-system/css';
import { grid } from '../../../styled-system/patterns';
import { getRecipeImgUrl } from '../../helpers/firebase.helpers';
import { getRecipePath } from '../../routes';
import { Recipe } from '../../types/recipe';
import { useShoppingList } from '../../contexts/ShoppingListContext';
import { ShoppingListItem } from '../../types/shoppingList';

import { Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { button } from '../../recipes/button';

const shoppingListBtnStyles = cx(
  button({
    circle: true,
    size: 'md',
  }),
  css({
    pos: 'absolute',
    top: '0.8rem',
    right: '0.8rem',
    zIndex: '9',
  }),
);

interface RecipeCardProps extends Recipe {
  id: string;
}

export const RecipeCard = ({ id, title, imageName, slug, nbServings }: RecipeCardProps) => {
  const {
    addToShoppingListAndNotify,
    shoppingListContainsRecipe,
    deleteFromShoppingListAndNotify,
  } = useShoppingList();

  const gradient = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.7))';
  const imageUrl = imageName && getRecipeImgUrl(imageName);
  const backgroundImage = imageName ? `${gradient}, url(${imageUrl})` : gradient;
  const noImage = !imageName;
  const isRecipeInShoppingList = shoppingListContainsRecipe(id);
  const item: ShoppingListItem = { id, servingsNb: Number(nbServings) };

  return (
    <div className={css({ pos: 'relative' })}>
      {isRecipeInShoppingList ? (
        <button
          onClick={() => deleteFromShoppingListAndNotify(id)}
          className={shoppingListBtnStyles}
          title='Supprimer la recette de votre liste de courses'
        >
          <Icon name='delete_outline' />
        </button>
      ) : (
        <button
          onClick={() => addToShoppingListAndNotify(item)}
          className={shoppingListBtnStyles}
          title='Ajouter la recette à votre liste de courses'
        >
          <Icon name='post_add' />
        </button>
      )}
      <Link
        to={getRecipePath(slug)}
        state={{ hasClickedLink: true }}
        className={cx(
          'group',
          grid({
            placeItems: 'end center',
            h: { base: '15.625rem', xsm: '21.875rem' },
            shadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            rounded: '2xl',
            pos: 'relative',
            bg: '#f5f5f5',
            overflow: 'hidden',
            isolation: 'isolate', // to fix ios bug where border-radius stops working during image scale animation
          }),
        )}
      >
        <div
          className={css({
            rounded: '2xl',
            bg: 'transparent center/cover no-repeat',
            pos: 'absolute',
            w: '100%',
            h: '100%',
            transitionDuration: '400ms',
            _groupHover: { scale: '1.1' },
          })}
          style={{ backgroundImage }}
        />
        {noImage && (
          <Icon
            name='image'
            className={css({
              color: 'rgb(223, 223, 223)',
              pos: 'absolute',
              top: '50%',
              left: '50%',
              translate: '-50% -50%',
              fontSize: '3.125rem!',
            })}
          />
        )}
        <p
          className={css({
            p: '0 1rem',
            m: '1rem auto',
            textAlign: 'center',
            pos: 'relative',
            zIndex: '999',
            color: 'white',
            fontWeight: '600',
            fontSize: { base: '1.5rem', xsm: '1.95rem' },
          })}
        >
          { title }
        </p>
      </Link>
    </div>
  );
};

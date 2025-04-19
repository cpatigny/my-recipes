import { Link, useNavigate } from 'react-router-dom';
import { hstack } from '../../../styled-system/patterns';
import { useToast } from '../../contexts/ToastContext';
import { deleteRecipe } from '../../helpers/recipe.helpers';
import { ROUTES, getEditRecipePath } from '../../routes';
import { RecipeWithId } from '../../types/recipe';
import { confirm } from '../../utils/utils';

import { css, cx } from '../../../styled-system/css';
import { Icon } from '../../components/Icon';
import { useUser } from '../../contexts/UserContext';
import { button } from '../../recipes/button';

interface RecipeActionsProps {
  recipe: RecipeWithId;
}

export const RecipeActions = ({ recipe }: RecipeActionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUser();

  const wordToEnter = 'oui';
  const confirmText = `Êtes-vous sûr de vouloir supprimer la recette "${recipe.title}" ? (cette action est irréversible !) Écrivez "${wordToEnter}" pour confirmer :`;

  const onClickHandler = () => {
    confirm(confirmText, wordToEnter, async () => {
      await deleteRecipe(recipe);
      navigate(ROUTES.HOME, { replace: true });
      toast.success('La recette a bien été supprimée');
    });
  };

  const copyCurrentUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(`L'url a bien été copiée`);
  };

  return (
    <div className={hstack()}>
      <button
        onClick={copyCurrentUrlToClipboard}
        className={cx(
          button({
            visual: 'semiTransparent',
            size: 'lg',
            circle: true,
          }),
          css({
            bg: '#eeeeee',
            color: 'text!',
            _hover: {
              borderColor: 'text',
            },
          }),
        )}
      >
        <Icon name='link' />
      </button>
      {user && (
        <>
          <Link
            to={getEditRecipePath(recipe.slug)}
            state={{ hasClickedLink: true }}
            className={button({
              visual: 'semiTransparent',
              size: 'lg',
              circle: true,
              color: 'edit',
            })}
          >
            <Icon name='edit' />
          </Link>
          <button
            onClick={onClickHandler}
            className={button({
              visual: 'semiTransparent',
              size: 'lg',
              circle: true,
              color: 'danger',
            })}
          >
            <Icon name='delete' />
          </button>
        </>
      )}
    </div>
  );
};

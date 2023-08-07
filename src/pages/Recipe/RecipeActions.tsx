import { useNavigate, Link } from 'react-router-dom';
import { RecipeWithId } from '../../types/recipe';
import { ROUTES, getEditRecipePath } from '../../routes';
import { deleteRecipe } from '../../helpers/recipe.helpers';
import { confirm } from '../../utils/utils';
import { useToast } from '../../contexts/ToastContext';
import { hstack } from '../../../styled-system/patterns';

import { Icon } from '../../components/Icon';
import { button } from '../../recipes/button';

interface RecipeActionsProps {
  recipe: RecipeWithId;
}

export const RecipeActions = ({ recipe }: RecipeActionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const wordToEnter = 'oui';
  const confirmText = `Êtes-vous sûr de vouloir supprimer la recette "${recipe.title}" ? (cette action est irréversible !) Écrivez "${wordToEnter}" pour confirmer :`;

  const onClickHandler = () => {
    confirm(confirmText, wordToEnter, async () => {
      await deleteRecipe(recipe);
      navigate(ROUTES.HOME, { replace: true });
      toast.success('La recette a bien été supprimée');
    });
  };

  return (
    <div className={hstack()}>
      <Link
        to={getEditRecipePath(recipe.slug)}
        state={{ hasClickedLink: true }}
        className={button({ visual: 'semiTransparent', size: 'lg', circle: true, color: 'edit' })}
      >
        <Icon name='edit' />
      </Link>
      <button
        onClick={onClickHandler}
        className={button({ visual: 'semiTransparent', size: 'lg', circle: true, color: 'danger' })}
      >
        <Icon name='delete' />
      </button>
    </div>
  );
};

import { useNavigate, Link } from 'react-router-dom';
import { RecipeWithId } from '../../types/recipe';
import { ROUTES, getEditRecipePath } from '../../routes';
import { deleteRecipe } from '../../helpers/recipe.helpers';
import { confirm } from '../../utils';
import { useToast } from '../../contexts/ToastContext';

import { Icon } from '../../components/Icon/Icon';

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
    <div className='recipe-actions'>
      <Link
        to={getEditRecipePath(recipe.slug)}
        state={{ hasClickedLink: true }}
        id='edit-recipe'
      >
        <Icon name='edit' />
      </Link>
      <button id='delete-recipe' onClick={onClickHandler}>
        <Icon name='delete' />
      </button>
    </div>
  );
};

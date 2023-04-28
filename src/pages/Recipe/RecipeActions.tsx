import confirm from '../../utils/confirm';
import { useNavigate, Link } from 'react-router-dom';
import { RecipeWithId } from '../../types/recipe';
import { deleteRecipe } from '../../utils/firebase/recipeMethods';
import { ROUTES, getEditRecipePath } from '../../utils/routes';

import Icon from '../../components/Icon/Icon';

interface RecipeActionsProps {
  recipe: RecipeWithId;
}

const RecipeActions = ({ recipe }: RecipeActionsProps) => {
  const navigate = useNavigate();

  const wordToEnter = 'oui';
  const confirmText = `Êtes-vous sûr de vouloir supprimer la recette "${recipe.title}" ? (cette action est irréversible !) Écrivez "${wordToEnter}" pour confirmer :`;

  const onClickHandler = () => {
    confirm(confirmText, wordToEnter, async () => {
      await deleteRecipe(recipe);
      navigate(ROUTES.HOME, { replace: true });
      alert('La recette a bien été supprimée.');
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

export default RecipeActions;

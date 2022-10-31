import confirm from '../../utils/confirm';
import { deleteRecipe } from '../../features/recipe/recipeSlice';
import { useNavigate, Link } from 'react-router-dom';
import { RecipeWithId } from '../../types/recipe';
import { useAppDispatch } from '../../app/hooks';

interface RecipeActionsProps {
  recipe: RecipeWithId;
}

const RecipeActions = ({ recipe }: RecipeActionsProps) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const wordToEnter = 'oui';
  const confirmText = `Êtes-vous sûr de vouloir supprimer la recette "${recipe.title}" ? (cette action est irréversible !) Écrivez "${wordToEnter}" pour confirmer :`;

  const onClickHandler = () => {
    confirm(confirmText, wordToEnter, () => {
      // we can use .then because deleteRecipe() return a Promise
      dispatch(deleteRecipe(recipe)).then(() => {
        navigate('/', { replace: true });
        alert('La recette a bien été supprimée.');
      });
    });
  };

  return (
    <div className='recipe-actions'>
      <Link
        to={`/edit/${recipe.slug}`}
        id='edit-recipe'
      >
        <span className='material-icons-round'>edit</span>
      </Link>
      <button id='delete-recipe' onClick={onClickHandler}>
        <span className='material-icons-round'>delete</span>
      </button>
    </div>
  );
};

export default RecipeActions;

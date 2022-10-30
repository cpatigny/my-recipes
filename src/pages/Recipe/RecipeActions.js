import confirm from '../../utils/confirm';
import { useDispatch } from 'react-redux';
import { deleteRecipe } from '../../features/recipe/recipeSlice';
import { useNavigate, Link } from 'react-router-dom';

const RecipeActions = ({ recipe }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const wordToEnter = 'oui';
  const confirmText = `Êtes-vous sûr de vouloir supprimer la recette "${recipe.title}" ? (cette action est irréversible !) Écrivez "${wordToEnter}" pour confirmer :`;

  return (
    <div className='recipe-actions'>
      <Link
        to={`/edit/${recipe.slug}`}
        id='edit-recipe'
      >
        <span className='material-icons-round'>edit</span>
      </Link>
      <button id='delete-recipe' onClick={() => confirm(confirmText, wordToEnter, () => {
        // we can use .then because deleteRecipe() return a Promise
        dispatch(deleteRecipe(recipe)).then(() => {
          navigate('/', { replace: true });
          alert('La recette a bien été supprimée.');
        });
      })}>
        <span className='material-icons-round'>delete</span>
      </button>
    </div>
  );
};

export default RecipeActions;

import { Navigate } from 'react-router-dom';
import { useUser } from '../../providers/UserProvider';
import { ROUTES } from '../../utils/routes';
import useRecipeBySlug from '../../hooks/useRecipeBySlug';

import RecipeMultiStepForm from '../../components/RecipeMultiStepForm/RecipeMultiStepForm';
import GoBack from '../../components/GoBack/GoBack';
import { RecipeMultiStepFormProvider } from '../../providers/RecipeMultiStepFormContext';

const EditRecipe = () => {
  const { user } = useUser();
  const { recipe, noMatch } = useRecipeBySlug();

  if (!user) return <Navigate to={ROUTES.HOME} replace />;
  if (noMatch) return <Navigate to={ROUTES.NOT_FOUND} replace />;

  return (
    <div className='edit-recipe container'>
      <div className='title-container'>
        <GoBack />
        <h1>Modifier la recette</h1>
      </div>
      <RecipeMultiStepFormProvider recipe={recipe}>
        <RecipeMultiStepForm />
      </RecipeMultiStepFormProvider>
    </div>
  );
};

export default EditRecipe;

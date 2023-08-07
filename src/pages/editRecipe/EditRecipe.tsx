import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { ROUTES } from '../../routes';
import { useRecipeBySlug } from '../../hooks/useRecipeBySlug';

import { RecipeMultiStepForm } from '../../components/RecipeMultiStepForm/RecipeMultiStepForm';
import { RecipeMultiStepFormProvider } from '../../contexts/RecipeMultiStepFormContext';
import { Container } from '../../components/Container';
import { ArrowBackWithTitle } from '../../components/ArrowBackWithTitle';

export const EditRecipe = () => {
  const { user } = useUser();
  const { recipe, noMatch } = useRecipeBySlug();

  if (!user) return <Navigate to={ROUTES.HOME} replace />;
  if (noMatch) return <Navigate to={ROUTES.NOT_FOUND} replace />;

  return (
    <Container type='admin'>
      <ArrowBackWithTitle title='Modifier la recette' />
      <RecipeMultiStepFormProvider recipe={recipe}>
        <RecipeMultiStepForm />
      </RecipeMultiStepFormProvider>
    </Container>
  );
};

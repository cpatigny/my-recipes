import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { ROUTES } from '../../routes';

import { RecipeMultiStepForm } from '../../components/RecipeMultiStepForm/RecipeMultiStepForm';
import { RecipeMultiStepFormProvider } from '../../contexts/RecipeMultiStepFormContext';
import { Container } from '../../components/Container';
import { ArrowBackWithTitle } from '../../components/ArrowBackWithTitle';

export const AddRecipe = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(ROUTES.HOME, { replace: true });
  }, [user, navigate]);

  return (
    <Container type='admin'>
      <ArrowBackWithTitle title='Ajouter une recette' />
      <RecipeMultiStepFormProvider>
        <RecipeMultiStepForm />
      </RecipeMultiStepFormProvider>
    </Container>
  );
};

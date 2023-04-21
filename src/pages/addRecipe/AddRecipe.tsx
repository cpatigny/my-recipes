import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import { ROUTES } from '../../utils/routes';

import RecipeMultiStepForm from '../../components/RecipeMultiStepForm/RecipeMultiStepForm';

const AddRecipe = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(ROUTES.HOME, { replace: true });
  }, [user, navigate]);

  return (
    <div className='add-recipe container'>
      <h1>Ajouter une recette</h1>
      <RecipeMultiStepForm />
    </div>
  );
};

export default AddRecipe;

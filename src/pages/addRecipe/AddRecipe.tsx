import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

import RecipeForm from '../../components/RecipeForm/RecipeForm';

const AddRecipe = () => {
  const { user } = useAppSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/', { replace: true });
  }, [user, navigate]);

  return (
    <div className='add-recipe container'>
      <h1>Ajouter une recette</h1>

      <RecipeForm />
    </div>
  );
};

export default AddRecipe;

import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';

import RecipeForm from '../../components/RecipeForm/RecipeForm';

const AddRecipe = () => {
  const { user } = useContext(UserContext);
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

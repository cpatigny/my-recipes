import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RecipeForm from '../../components/RecipeForm/RecipeForm';

const AddRecipe = () => {
  const { user } = useSelector(state => state.user);
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

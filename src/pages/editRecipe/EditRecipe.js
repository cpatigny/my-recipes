import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipesContext } from '../../providers/RecipesProvider';
import { UserContext } from '../../providers/UserProvider';

import RecipeForm from '../../components/RecipeForm/RecipeForm';

const EditRecipe = () => {

  let { recipe } = useContext(RecipesContext);
  let { user } = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/', { replace: true });
  }, [user, navigate]);

  return (
    <div className='edit-recipe container'>
      <h1>Modifier la recette</h1>

      <RecipeForm recipe={recipe} />
    </div>
  );
};

export default EditRecipe;

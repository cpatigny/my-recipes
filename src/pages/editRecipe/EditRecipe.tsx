import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import findMatchingRecipeWithSlug from '../../utils/findMatchingRecipeWithSlug';
import { useAppSelector } from '../../app/hooks';
import { RecipeWithId } from '../../types/recipe';

import RecipeForm from '../../components/RecipeForm/RecipeForm';

const EditRecipe = () => {
  const [recipe, setRecipe] = useState<RecipeWithId | null>(null);

  const { user } = useAppSelector(state => state.user);
  const { recipes } = useAppSelector(state => state.recipe);

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (recipes && slug) {
      const matchingRecipe = findMatchingRecipeWithSlug(slug, recipes);

      // no match : redirect to home page
      if (!matchingRecipe) navigate('/', { replace: true });

      setRecipe(matchingRecipe);
    }
  }, [navigate, recipes, slug]);

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

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import findMatchingRecipeWithSlug from '../../utils/findMatchingRecipeWithSlug';
import { RecipeWithId } from '../../types/recipe';
import { UserContext } from '../../providers/UserProvider';
import { RecipesContext } from '../../providers/RecipesProvider';

import RecipeForm from '../../components/RecipeForm/RecipeForm';

const EditRecipe = () => {
  const [recipe, setRecipe] = useState<RecipeWithId | null>(null);

  const { user } = useContext(UserContext);
  const { recipes } = useContext(RecipesContext);

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
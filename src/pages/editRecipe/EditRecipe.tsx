import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getRecipeBySlug from '../../utils/recipes/getRecipeBySlug';
import { RecipeWithId } from '../../types/recipe';
import { useUser } from '../../providers/UserProvider';
import { useRecipes } from '../../providers/RecipesProvider';
import { ROUTES } from '../../utils/routes';

import RecipeMultiStepForm from '../../components/RecipeMultiStepForm/RecipeMultiStepForm';

const EditRecipe = () => {
  const [recipe, setRecipe] = useState<RecipeWithId | null>(null);

  const { user } = useUser();
  const { recipes } = useRecipes();

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (recipes && slug) {
      const matchingRecipe = getRecipeBySlug(slug, recipes);

      // no match : redirect to home page
      if (!matchingRecipe) navigate(ROUTES.NOT_FOUND, { replace: true });

      setRecipe(matchingRecipe);
    }
  }, [navigate, recipes, slug]);

  useEffect(() => {
    if (!user) navigate(ROUTES.HOME, { replace: true });
  }, [user, navigate]);

  return (
    <div className='edit-recipe container'>
      <h1>Modifier la recette</h1>
      <RecipeMultiStepForm recipe={recipe} />
    </div>
  );
};

export default EditRecipe;

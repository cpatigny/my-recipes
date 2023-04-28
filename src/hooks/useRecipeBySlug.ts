import { useParams } from 'react-router-dom';
import { useRecipes } from '../providers/RecipesProvider';
import { useState, useEffect } from 'react';
import { RecipeWithId } from '../types/recipe';
import getRecipeBySlug from '../utils/recipes/getRecipeBySlug';

const useRecipeBySlug = () => {
  const [recipe, setRecipe] = useState<RecipeWithId | null>(null);
  const [noMatch, setNoMatch] = useState(false);

  const { recipes } = useRecipes();
  const { slug } = useParams();

  useEffect(() => {
    if (recipes && slug) {
      const matchingRecipe = getRecipeBySlug(slug, recipes);

      // no match : redirect to home page
      if (!matchingRecipe) setNoMatch(true);

      setRecipe(matchingRecipe);
    }
  }, [recipes, slug]);

  return { recipe, noMatch };
};

export default useRecipeBySlug;

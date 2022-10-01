import { off } from 'firebase/database';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import findMatchingRecipeWithSlug from '../utils/findMatchingRecipeWithSlug';
import Manager from '../utils/firebase/Manager';

export const RecipesContext = createContext({
  recipes: 'loading',
  recipe: 'loading',
});

const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState('loading');
  const [recipe, setRecipe] = useState('loading');

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const recipeManager = new Manager('recipes');

    recipeManager.getAll(snapshot => {
      const data = snapshot.val();
      setRecipes(data);
    });

    return () => off(recipeManager.ref);
  }, [navigate]);

  useEffect(() => {
    if (recipes === 'loading' || !slug) return;

    const matchingRecipe = findMatchingRecipeWithSlug(slug, recipes);

    // no match : redirect to home page
    if (!matchingRecipe) navigate('/', { replace: true });

    setRecipe(matchingRecipe);
  }, [navigate, recipes, slug]);

  return (
    <RecipesContext.Provider value={{ recipes, recipe }}>
      { children }
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;

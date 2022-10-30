import { useEffect, useState } from 'react';
import remarkGfm from 'remark-gfm';
import { useNavigate, useParams } from 'react-router-dom';
import findMatchingRecipeWithSlug from '../../utils/findMatchingRecipeWithSlug';
import { useSelector } from 'react-redux';
import formatDate from '../../utils/formatDate';

import Loading from '../../components/Loading/Loading';
import RecipeActions from './RecipeActions';
import ReactMarkdown from 'react-markdown';
import Logo from '../../components/Logo/Logo';
import RecipeImage from './RecipeImage';

import './Recipe.scss';

const components = {
  h1: 'h3',
  h2: 'h4',
  h3: 'h5',
  // we need to put ordered to avoid passing it in ...props because it throws an error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  li: ({ ordered, ...props }) => (
    <li>
      <label className='checkbox-container'>
        <input type='checkbox' />
        <span className='checkmark' { ...props } />
      </label>
    </li>
  ),
};

const Recipe = () => {
  const [recipe, setRecipe] = useState(null);

  const { user } = useSelector(state => state.user);
  const { recipes } = useSelector(state => state.recipe);

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
    window.scrollTo(0, 0);
  }, [recipe]); // we need to put [recipe] otherwise the scroll will only apply when page is Loading

  if (!recipe) return <Loading />;

  return (
    <div className={`show-recipe container ${recipe.imageName ? '' : 'no-image'}`}>
      <Logo />

      <div className='recipe-header'>
        <h1>{ recipe.title }</h1>
        { user && <RecipeActions recipe={recipe} /> }
      </div>

      { recipe.createdAt &&
        <div className='recipe-date'>
          <span>Ajouté le <b>{ formatDate(recipe.createdAt) }</b></span>
        </div>
      }

      <RecipeImage recipe={recipe} />

      <div className='ingredients'>
        <h2>Ingrédients</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          { recipe.ingredients }
        </ReactMarkdown>
      </div>

      <div className='recipe-content'>
        <h2>Préparation</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ h1: 'h3', h2: 'h4', h3: 'h5' }}>
          { recipe.content }
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Recipe;

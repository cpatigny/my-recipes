import { useContext, useEffect, useState } from 'react';
import remarkGfm from 'remark-gfm';
import { useNavigate, useParams } from 'react-router-dom';
import getRecipeBySlug from '../../utils/recipes/getRecipeBySlug';
import formatDate from '../../utils/formatDate';
import { RecipeWithId } from '../../types/recipe';
import { UserContext } from '../../providers/UserProvider';
import { RecipesContext } from '../../providers/RecipesProvider';
import useScrollRestoration from '../../hooks/useScrollRestoration';
import { CategoriesContext } from '../../providers/CategoriesProvider';

import Loading from '../../components/Loading/Loading';
import RecipeActions from './RecipeActions';
import ReactMarkdown, { Components } from 'react-markdown';
import RecipeImage from './RecipeImage';
import GoBack from '../../components/GoBack/GoBack';
import Category from '../home/Category';

import './Recipe.scss';

interface CustomListItemProps {
  ordered: boolean;
}

// we need to extract "ordered" to avoid passing it in ...props
// because it throws an error because ordered should be non-boolean but it receives boolean
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomListItem = ({ ordered, ...props }: CustomListItemProps) => (
  <li>
    <label className='checkbox-container'>
      <input type='checkbox' />
      <span className='checkmark' { ...props } />
    </label>
  </li>
);

const components: Components = {
  h1: 'h3',
  h2: 'h4',
  h3: 'h5',
  li: ({ ...props }) => <CustomListItem { ...props } />,
};

const Recipe = () => {
  const [recipe, setRecipe] = useState<RecipeWithId | null>(null);

  const { user } = useContext(UserContext);
  const { recipes } = useContext(RecipesContext);
  const { categories } = useContext(CategoriesContext);

  const navigate = useNavigate();
  const { slug } = useParams();
  const { restoreScroll } = useScrollRestoration();

  useEffect(() => {
    if (recipes && slug) {
      const matchingRecipe = getRecipeBySlug(slug, recipes);

      // no match : redirect to home page
      if (!matchingRecipe) navigate('/', { replace: true });

      setRecipe(matchingRecipe);
    }
  }, [navigate, recipes, slug]);

  useEffect(() => {
    restoreScroll();
  }, [restoreScroll]);

  if (!recipe || !categories) return <Loading />;

  const recipeCategory = categories[recipe.category];

  return (
    <div className={`show-recipe container ${recipe.imageName ? '' : 'no-image'}`}>
      <div className='recipe-header'>
        <GoBack />
        <h1>{ recipe.title }</h1>
      </div>

      <div className='wrapper'>
        { recipe.createdAt &&
          <div className='recipe-date'>
            <span>Ajouté le <b>{ formatDate(recipe.createdAt) }</b></span>
          </div>
        }

        { user && <RecipeActions recipe={recipe} /> }
      </div>

      <RecipeImage recipe={recipe} />

      { recipeCategory && (
        <>
          catégorie :
          {' '}
          <Category category={recipeCategory} />
        </>
      )}

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

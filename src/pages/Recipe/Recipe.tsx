import { useEffect } from 'react';
import remarkGfm from 'remark-gfm';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useScrollRestoration } from '../../hooks/useScrollRestoration';
import { useCategories } from '../../contexts/CategoriesContext';
import { ROUTES } from '../../routes';
import { useRecipeBySlug } from '../../hooks/useRecipeBySlug';
import { formatDate } from '../../utils';
import { getCookTimeText } from '../../helpers/recipe.helpers';

import { Loading } from '../../components/Loading/Loading';
import { RecipeActions } from './RecipeActions';
import ReactMarkdown from 'react-markdown';
import { RecipeImage } from './RecipeImage';
import { GoBack } from '../../components/GoBack/GoBack';
import { Category } from '../home/Category';
import { IngredientsSection } from './IngredientsSection';

import './Recipe.scss';

export const Recipe = () => {
  const { user } = useUser();
  const { categories } = useCategories();
  const { restoreScroll } = useScrollRestoration();
  const { recipe, noMatch } = useRecipeBySlug();

  useEffect(() => {
    if (!recipe) return;
    document.title = recipe.title;
  }, [recipe]);

  useEffect(() => {
    restoreScroll();
  }, [restoreScroll]);

  if (noMatch) return <Navigate to={ROUTES.NOT_FOUND} replace />;
  if (!recipe || !categories) return <Loading />;

  const recipeCategory = recipe.categoryId && categories[recipe.categoryId];
  const { cookTimeInMins } = recipe;

  return (
    <div className={`show-recipe container ${recipe.imageName ? '' : 'no-image'}`}>
      <div className='recipe-header'>
        <GoBack />
        <div className='title-category'>
          <h1>{ recipe.title }</h1>
          { recipeCategory && (
            <Category category={recipeCategory} />
          )}
        </div>
      </div>

      <div className='wrapper'>
        <div className='recipe-date'>
          <span>Ajouté le <b>{ formatDate(recipe.createdAt) }</b></span>
        </div>

        { user && <RecipeActions recipe={recipe} /> }
      </div>

      <RecipeImage recipe={recipe} />

      {cookTimeInMins && (
        <p>Temps de cuisson : <b>{ getCookTimeText(cookTimeInMins) }</b></p>
      )}

      <IngredientsSection recipe={recipe} />

      <section className='recipe-content'>
        <h2>Préparation</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ h1: 'h3', h2: 'h4', h3: 'h5' }}>
          { recipe.content }
        </ReactMarkdown>
      </section>
    </div>
  );
};

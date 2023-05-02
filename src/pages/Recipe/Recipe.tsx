import { useEffect } from 'react';
import remarkGfm from 'remark-gfm';
import { Navigate } from 'react-router-dom';
import { GroupWithIngredients, RecipeIngredientWithId } from '../../types/recipe';
import { useUser } from '../../contexts/UserContext';
import useScrollRestoration from '../../hooks/useScrollRestoration';
import { useCategories } from '../../contexts/CategoriesContext';
import { ROUTES } from '../../routes';
import useRecipeBySlug from '../../hooks/useRecipeBySlug';
import { getGroupsWithTheirIngredients } from '../../helpers/group.helpers';
import { getIngredientsWithoutGroup } from '../../helpers/ingredient.helpers';
import { formatDate } from '../../utils';

import Loading from '../../components/Loading/Loading';
import RecipeActions from './RecipeActions';
import ReactMarkdown, { Components } from 'react-markdown';
import RecipeImage from './RecipeImage';
import GoBack from '../../components/GoBack/GoBack';
import Category from '../home/Category';
import IngredientList from './IngredientList';
import GroupList from './GroupList';

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
  const { user } = useUser();
  const { categories } = useCategories();

  const { restoreScroll } = useScrollRestoration();
  const { recipe, noMatch } = useRecipeBySlug();

  useEffect(() => {
    restoreScroll();
  }, [restoreScroll]);

  if (noMatch) return <Navigate to={ROUTES.NOT_FOUND} replace />;
  if (!recipe || !categories) return <Loading />;

  const recipeCategory = recipe.categoryId && categories[recipe.categoryId];
  const { ingredients, groups } = recipe;

  let ingredientsWithoutGroup: RecipeIngredientWithId[] | null = null;
  let groupsWithIngredients: GroupWithIngredients[] | null = null;

  if (typeof ingredients === 'object') {
    ingredientsWithoutGroup = getIngredientsWithoutGroup(ingredients);
  }

  if (typeof ingredients === 'object' && typeof groups === 'object') {
    groupsWithIngredients = getGroupsWithTheirIngredients(groups, ingredients);
  }

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
        {typeof ingredients === 'string' && (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            { ingredients }
          </ReactMarkdown>
        )}
        {ingredientsWithoutGroup && (
          <IngredientList ingredients={ingredientsWithoutGroup} />
        )}
        {groupsWithIngredients && (
          <GroupList groups={groupsWithIngredients} />
        )}
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

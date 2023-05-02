import { GroupWithIngredients, RecipeIngredientWithId } from '../../types/recipe';
import remarkGfm from 'remark-gfm';
import getIngredientsWithoutGroup from '../../utils/ingredients/getIngredientsWithoutGroup';
import getGroupsWithTheirIngredients from '../../utils/groups/getGroupsWithTheirIngredients';
import { useCategories } from '../../providers/CategoriesProvider';
import { useRecipeMultiStepForm } from '../../providers/RecipeMultiStepFormContext';
import getCategoryName from '../../utils/categories/getCategoryName';

import ReactMarkdown from 'react-markdown';
import PreviewIngredientList from './PreviewIngredientList';

const Preview = () => {
  const { recipeFormData, previewImageSrc } = useRecipeMultiStepForm();
  const { categories } = useCategories();

  const { ingredients, groups, category } = recipeFormData;
  const noIngredients = typeof ingredients === 'object' && Object.keys(ingredients).length === 0;

  let ingredientsWithoutGroup: RecipeIngredientWithId[] | null = null;
  let groupsWithIngredients: GroupWithIngredients[] | null = null;

  if (typeof ingredients === 'object') {
    ingredientsWithoutGroup = getIngredientsWithoutGroup(ingredients);
  }

  if (typeof ingredients === 'object' && typeof groups === 'object') {
    groupsWithIngredients = getGroupsWithTheirIngredients(groups, ingredients);
  }

  const categoryName = getCategoryName(category, categories);

  return (
    <div id='submit-recipe' className='form-container preview'>
      <div className='recipe-preview'>
        <h2 className='title'>{ recipeFormData.title }</h2>
        {previewImageSrc && recipeFormData.imageName && (
          <img src={previewImageSrc} alt={recipeFormData.imageName} />
        )}

        <p>Catégorie : { categoryName }</p>

        <h3>Ingrédients</h3>
        <p>{ recipeFormData.nbServings } { recipeFormData.servingsUnit } :</p>
        {typeof ingredients === 'string' && (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ h1: 'h3', h2: 'h4', h3: 'h5' }}>
            { ingredients }
          </ReactMarkdown>
        )}

        { noIngredients && (
          <p className='secondary'>Vous n&apos;avez ajouté aucun ingrédient</p>
        )}

        <PreviewIngredientList ingredients={ingredientsWithoutGroup} />

        {groupsWithIngredients && groupsWithIngredients.map(group => (
          <div key={group.id} className='group-preview'>
            <p>{ group.name } :</p>
            <PreviewIngredientList ingredients={group.ingredients} />
          </div>
        ))}

        <h3>Préparation</h3>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ h1: 'h3', h2: 'h3' }}>
          { recipeFormData.content }
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Preview;

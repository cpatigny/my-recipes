import { GroupWithIngredients } from '../../../types/recipe';
import remarkGfm from 'remark-gfm';
import { useCategories } from '../../../contexts/CategoriesContext';
import { useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';
import { getCategoryName } from '../../../helpers/category.helpers';
import { getGroupsWithTheirIngredients } from '../../../helpers/group.helpers';
import { getIngredientsWithoutGroup } from '../../../helpers/ingredient.helpers';
import { getCookTimeText } from '../../../helpers/recipe.helpers';

import ReactMarkdown from 'react-markdown';
import PreviewIngredientList from './PreviewIngredientList';

const Preview = () => {
  const { recipeFormData, previewImageSrc } = useRecipeMultiStepForm();
  const { categories } = useCategories();

  const { ingredients, groups, categoryId, cookTimeInMins } = recipeFormData;
  const noIngredients = Object.keys(ingredients).length === 0;

  const ingredientsWithoutGroup = getIngredientsWithoutGroup(ingredients);
  let groupsWithIngredients: GroupWithIngredients[] | null = null;

  if (typeof groups === 'object') {
    groupsWithIngredients = getGroupsWithTheirIngredients(groups, ingredients);
  }

  const categoryName = getCategoryName(categoryId, categories);

  return (
    <div id='submit-recipe' className='form-container preview'>
      <div className='recipe-preview'>
        <h2 className='title'>{ recipeFormData.title }</h2>
        {previewImageSrc && recipeFormData.imageName && (
          <img src={previewImageSrc} alt={recipeFormData.imageName} />
        )}

        {cookTimeInMins && (
          <p>Temps de cuisson : <b>{ getCookTimeText(cookTimeInMins) }</b></p>
        )}

        <p>Catégorie : { categoryName }</p>

        <h3>Ingrédients</h3>
        <p>{ recipeFormData.nbServings } { recipeFormData.servingsUnit } :</p>

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

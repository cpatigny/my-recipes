import { GroupWithIngredients, RecipeIngredientWithId, RecipeFormData } from '../../types/recipe';
import remarkGfm from 'remark-gfm';
import getIngredientsWithoutGroup from '../../utils/ingredients/getIngredientsWithoutGroup';
import getGroupsWithTheirIngredients from '../../utils/groups/getGroupsWithTheirIngredients';
import { useCategories } from '../../providers/CategoriesProvider';

import ReactMarkdown from 'react-markdown';
import PreviewIngredientList from './PreviewIngredientList';

interface PreviewProps {
  recipeFormData: RecipeFormData;
  previewImageSrc: string | null;
}

const Preview = ({ recipeFormData, previewImageSrc }: PreviewProps) => {
  const { ingredients, groups } = recipeFormData;

  const { categories } = useCategories();

  const noIngredients = typeof ingredients === 'object' && Object.keys(ingredients).length === 0;

  let ingredientsWithoutGroup: RecipeIngredientWithId[] | null = null;
  let groupsWithIngredients: GroupWithIngredients[] | null = null;

  if (typeof ingredients === 'object') {
    ingredientsWithoutGroup = getIngredientsWithoutGroup(ingredients);
  }

  if (typeof ingredients === 'object' && typeof groups === 'object') {
    groupsWithIngredients = getGroupsWithTheirIngredients(groups, ingredients);
  }

  return (
    <div id='submit-recipe' className='form-container preview'>
      <h2>Aperçu</h2>
      <div className='recipe-preview'>
        <h2 className='title'>{ recipeFormData.title }</h2>
        {previewImageSrc && recipeFormData.imageName && (
          <img src={previewImageSrc} alt={recipeFormData.imageName} />
        )}

        {categories && (
          <p>Catégorie : { categories[recipeFormData.category]?.name }</p>
        )}

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

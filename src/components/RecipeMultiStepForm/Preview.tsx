import { GroupWithIngredients, RecipeIngredientWithId, RecipeFormData } from '../../types/recipe';
import remarkGfm from 'remark-gfm';
import getIngredientsWithoutGroup from '../../utils/ingredients/getIngredientsWithoutGroup';
import getGroupsWithTheirIngredients from '../../utils/groups/getGroupsWithTheirIngredients';
import { useCategories } from '../../providers/CategoriesProvider';

import ReactMarkdown from 'react-markdown';
import PreviewIngredientList from './PreviewIngredientList';

interface PreviewProps {
  formData: RecipeFormData;
  previewImageSrc: string | null;
}

const Preview = ({ formData, previewImageSrc }: PreviewProps) => {
  const { ingredients, groups } = formData;

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
        <h2 className='title'>{ formData.title }</h2>
        {previewImageSrc && formData.imageName && (
          <img src={previewImageSrc} alt={formData.imageName} />
        )}

        {categories && (
          <p>Catégorie : { categories[formData.category]?.name }</p>
        )}

        <h3>Ingrédients</h3>
        <p>{ formData.nbServings } { formData.servingsUnit } :</p>
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
          { formData.content }
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Preview;

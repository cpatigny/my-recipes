import { GroupWithIngredients } from '../../../types/recipe';
import remarkGfm from 'remark-gfm';
import { useCategories } from '../../../contexts/CategoriesContext';
import { useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';
import { getCategoryName } from '../../../helpers/category.helpers';
import { getGroupsWithTheirIngredients } from '../../../helpers/group.helpers';
import { getIngredientsWithoutGroup } from '../../../helpers/ingredient.helpers';
import { getCookTimeText } from '../../../helpers/recipe.helpers';

import ReactMarkdown from 'react-markdown';
import { PreviewIngredientList } from './PreviewIngredientList';
import { Block } from '../../Block';
import { SecondaryText } from '../../SecondaryText';
import { css } from '../../../../styled-system/css';

const h3Size = 'clamp(1.6rem, 0.97rem + 2.24vw, 1.95rem)';

export const Preview = () => {
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
    <div>
      <Block>
        <h2 className={css({ fontSize: 'pageTitle', mb: '0.2rem' })}>
          {recipeFormData.title}
        </h2>
        {previewImageSrc && recipeFormData.imageName && (
          <img
            src={previewImageSrc}
            alt={recipeFormData.imageName}
            className={css({ mb: '0.6rem' })}
          />
        )}

        {cookTimeInMins && (
          <p>
            Temps de cuisson : <b>{getCookTimeText(cookTimeInMins)}</b>
          </p>
        )}

        <p>Catégorie : {categoryName}</p>

        <h3 className={css({ fontSize: h3Size, my: '1.9rem' })}>Ingrédients</h3>
        <p>
          {recipeFormData.nbServings} {recipeFormData.servingsUnit} :
        </p>

        {noIngredients && (
          <SecondaryText>
            Vous n&apos;avez ajouté aucun ingrédient
          </SecondaryText>
        )}

        <PreviewIngredientList ingredients={ingredientsWithoutGroup} />

        {groupsWithIngredients &&
          groupsWithIngredients.map(group => (
            <div key={group.id}>
              <p>{group.name} :</p>
              <PreviewIngredientList ingredients={group.ingredients} />
            </div>
          ))}

        <h3 className={css({ fontSize: h3Size, my: '1.9rem' })}>Préparation</h3>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{ h1: 'h3', h2: 'h3' }}
          className={css({
            '& h3': {
              fontSize: 'clamp(1.36rem, 1.1916rem + 0.8421vw, 1.56rem)',
              fontWeight: '700',
              m: '2.2rem 0 0.625rem',
            },
            '& p': {
              fontSize: '1.2rem',
              lineHeight: '150%',
              mt: '0.625rem',
            },
          })}
        >
          {recipeFormData.content}
        </ReactMarkdown>
      </Block>
    </div>
  );
};

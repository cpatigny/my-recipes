import { css } from '../../../styled-system/css';

import { getIngredientList } from '../../helpers/recipe.helpers';
import { ShoppingListRecipeWithId } from '../../types/shoppingList';

import { flex } from '../../../styled-system/patterns';
import { useIngredientsDetails } from '../../contexts/IngredientsDetailsContext';
import { useToast } from '../../contexts/ToastContext';
import { useUnits } from '../../contexts/UnitsContext';
import { getIngredientText } from '../../helpers/ingredient.helpers';
import { IngredientList } from '../../pages/Recipe/IngredientList';
import { button } from '../../recipes/button';
import { trim } from '../../utils/utils';
import { Icon } from '../Icon';
import { SecondaryText } from '../SecondaryText';

interface ShoppingListIngredientsTabProps {
  recipes: ShoppingListRecipeWithId[];
}

export const ShoppingListIngredientsTab = ({
  recipes,
}: ShoppingListIngredientsTabProps) => {
  const { toast } = useToast();
  const { ingredientsDetails } = useIngredientsDetails();
  const { units } = useUnits();

  const ingredientList = getIngredientList(recipes);

  const copyIngredientsToClipboard = () => {
    const copyText = ingredientList.reduce((textSum, ingredient) => {
      const { ingredientText } = getIngredientText(
        ingredient,
        ingredientsDetails,
        units,
      );
      textSum = textSum + '\n' + ingredientText;
      return textSum;
    }, '');
    navigator.clipboard.writeText(trim(copyText, '\n'));
    toast.success('La liste des ingrédients a bien été copiée');
  };

  return (
    <>
      <div className={flex({ align: 'center', gap: '0 1rem', my: '1rem' })}>
        <h3 className={css({ fontSize: '3xl' })}>Liste des ingrédients</h3>
        <button
          className={button({ size: 'lg', circle: true })}
          onClick={copyIngredientsToClipboard}
        >
          <Icon name='content_copy' fontSize='1.2rem' />
        </button>
      </div>
      {ingredientList.length > 0 ? (
        <IngredientList ingredients={ingredientList} />
      ) : (
        <SecondaryText>
          Vous n&apos;avez aucune recette dans votre liste de courses
        </SecondaryText>
      )}
    </>
  );
};

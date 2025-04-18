import { css } from '../../../styled-system/css';

import { getIngredientList } from '../../helpers/recipe.helpers';
import { ShoppingListRecipeWithId } from '../../types/shoppingList';

import { IngredientList } from '../../pages/Recipe/IngredientList';
import { SecondaryText } from '../SecondaryText';

interface ShoppingListIngredientsTabProps {
  recipes: ShoppingListRecipeWithId[];
}

export const ShoppingListIngredientsTab = ({
  recipes,
}: ShoppingListIngredientsTabProps) => {
  const ingredientList = getIngredientList(recipes);

  return (
    <>
      <h3 className={css({ fontSize: '3xl', my: '1rem' })}>
        Liste des ingrédients
      </h3>
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

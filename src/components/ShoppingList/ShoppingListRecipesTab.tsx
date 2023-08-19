import { css } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';
import { useShoppingList } from '../../contexts/ShoppingListContext';
import { updateShoppingListItem } from '../../helpers/shoppingList.helpers';
import { ShoppingListRecipeWithId } from '../../types/shoppingList';

import { Button } from '../Button';
import { SecondaryText } from '../SecondaryText';
import { ShoppingListRecipe } from './ShoppingListRecipe';

export const ShoppingListRecipesTab = ({ recipes }: { recipes: ShoppingListRecipeWithId[] }) => {
  const {
    deleteFromShoppingListAndNotify,
    clearShoppingListItems,
    incrementServingsNb,
    decrementServingsNb,
  } = useShoppingList();

  return (
    <>
      <div
        className={flex({
          gap: '1rem',
          justify: 'space-between',
          align: 'center',
          m: '1rem 0 1.5rem',
        })}
      >
        <h3 className={css({ fontSize: '3xl' })}>
          { recipes.length } { recipes.length > 1 ? 'recettes' : 'recette' }
        </h3>
        {recipes.length > 0 && (
          <Button visual='outline' fontSize='1rem' onClick={clearShoppingListItems}>
            Vider la liste
          </Button>
        )}
      </div>
      {recipes.length === 0 && (
        <SecondaryText>Vous n&apos;avez aucune recette dans votre liste de courses</SecondaryText>
      )}
      {recipes.map(recipe => (
        <ShoppingListRecipe
          key={recipe.id}
          recipe={recipe}
          deleteFromShoppingListAndNotify={deleteFromShoppingListAndNotify}
          updateShoppingListItem={updateShoppingListItem}
          incrementServingsNb={incrementServingsNb}
          decrementServingsNb={decrementServingsNb}
        />
      ))}
    </>
  );
};

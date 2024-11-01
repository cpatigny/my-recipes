import { ShoppingList, ShoppingListItem } from '../types/shoppingList';

export const SHOPPING_LIST_LOCALSTORAGE_KEY = 'shopping-list';

export const getShoppingList = (): ShoppingList => {
  return JSON.parse(
    localStorage.getItem(SHOPPING_LIST_LOCALSTORAGE_KEY) || '[]',
  );
};

export const setShoppingListStorage = (shoppingList: ShoppingList) => {
  localStorage.setItem(
    SHOPPING_LIST_LOCALSTORAGE_KEY,
    JSON.stringify(shoppingList),
  );
};

export const addToShoppingList = (item: ShoppingListItem) => {
  const shoppingList = getShoppingList();
  setShoppingListStorage([...shoppingList, item]);
};

export const deleteRecipeFromShoppingList = (recipeId: string) => {
  const shoppingList = getShoppingList();
  const updatedShoppingList = shoppingList.filter(
    recipe => recipe.id !== recipeId,
  );
  setShoppingListStorage(updatedShoppingList);
};

export const clearShoppingList = () => {
  localStorage.removeItem(SHOPPING_LIST_LOCALSTORAGE_KEY);
};

export const updateShoppingListItem = (
  recipeId: string,
  newServingsNb: number,
) => {
  const shoppingList = getShoppingList();
  const recipeIndex = shoppingList.findIndex(item => item.id === recipeId);
  shoppingList[recipeIndex]!.servingsNb = newServingsNb;
  setShoppingListStorage(shoppingList);
};

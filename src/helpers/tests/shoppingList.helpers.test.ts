import {
  SHOPPING_LIST_LOCALSTORAGE_KEY,
  ShoppingListItem as ShoppingListItemType,
  addToShoppingList,
  clearShoppingList,
  deleteRecipeFromShoppingList,
  getShoppingList,
  setShoppingListStorage,
  updateShoppingListItem,
} from '../shoppingList.helpers';

const shoppingListItem: ShoppingListItemType = { id: '0', servingsNb: 3 };

describe('setShoppingList', () => {
  test('should store shopping list in localstorage', () => {
    setShoppingListStorage([shoppingListItem]);
    const shoppingList = getShoppingList();
    expect(shoppingList).toContainEqual(shoppingListItem);
  });
});

describe('getShoppingList', () => {
  test('should return the stored shopping list', () => {
    setShoppingListStorage([{ id: '1', servingsNb: 5 }]);
    expect(getShoppingList().length).toBe(1);
  });

  test('should return an empty array if nothing is stored in local storage', () => {
    localStorage.removeItem(SHOPPING_LIST_LOCALSTORAGE_KEY);
    const shoppingList = getShoppingList();
    expect(Array.isArray(shoppingList)).toBe(true);
    expect(shoppingList.length).toBe(0);
  });
});

describe('clearShoppingList', () => {
  test('should clear shopping list from local storage', () => {
    setShoppingListStorage([shoppingListItem]);
    clearShoppingList();
    const shoppingList = localStorage.getItem(SHOPPING_LIST_LOCALSTORAGE_KEY);
    expect(shoppingList).toBeNull();
  });
});

describe('addToShoppingList', () => {
  test('should add recipe to the list', () => {
    clearShoppingList();
    addToShoppingList(shoppingListItem);
    expect(getShoppingList()).toContainEqual(shoppingListItem);
  });

  test('should not overide existing data', () => {
    clearShoppingList();
    addToShoppingList({ id: '1', servingsNb: 54 });
    addToShoppingList({ id: '2', servingsNb: 12 });
    expect(getShoppingList().length).toBe(2);
  });
});

describe('deleteRecipeFromShoppingList', () => {
  test('should delete recipe from shopping list', () => {
    clearShoppingList();
    addToShoppingList(shoppingListItem);
    deleteRecipeFromShoppingList(shoppingListItem.id);
    const storageContainsRecipe = getShoppingList().some(item => item.id === shoppingListItem.id);
    expect(storageContainsRecipe).toBe(false);
  });
});

describe('updateShoppingListItem', () => {
  test('should update item', () => {
    clearShoppingList();
    addToShoppingList(shoppingListItem);
    const newValue = 15;
    updateShoppingListItem(shoppingListItem.id, newValue);
    const updatedItem = getShoppingList().find(item => item.id === shoppingListItem.id);
    expect(updatedItem).toBeDefined();
    expect(updatedItem?.servingsNb).toBe(newValue);
  });

  test('should not overide existing data', () => {
    clearShoppingList();
    const id = '1';
    addToShoppingList({ id, servingsNb: 54 });
    addToShoppingList({ id: '2', servingsNb: 12 });
    updateShoppingListItem(id, 45);
    expect(getShoppingList().length).toBe(2);
  });
});

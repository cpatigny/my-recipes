import { createContext, useContext, useState } from 'react';
import { ShoppingList, ShoppingListItem, addToShoppingList, clearShoppingList, deleteRecipeFromShoppingList, getShoppingList } from '../helpers/shoppingList.helpers';
import { RecipeWithId } from '../types/recipe';
import { useRecipes } from './RecipesContext';
import { useToast } from './ToastContext';

interface ShoppingListContextValues {
  shoppingList: ShoppingList;
  setShoppingList: React.Dispatch<React.SetStateAction<ShoppingList>>;
}

const ShoppingListContext = createContext<ShoppingListContextValues | null>(null);

export const ShoppingListProvider = ({ children }: { children: React.ReactNode }) => {
  const [shoppingList, setShoppingList] = useState(getShoppingList());

  return (
    <ShoppingListContext.Provider value={{ shoppingList, setShoppingList }}>
      { children }
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);

  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }

  const { shoppingList, setShoppingList } = context;
  const { toast } = useToast();
  const { recipes } = useRecipes();

  const shoppingListRecipes: RecipeWithId[] = [];
  shoppingList.forEach(item => {
    const recipe = recipes && recipes[item.id];
    if (!recipe) return;
    shoppingListRecipes.push({
      ...recipe,
      id: item.id,
      nbServings: item.servingsNb.toString(),
    });
  });

  const addToShoppingListAndNotify = (item: ShoppingListItem) => {
    addToShoppingList(item);
    setShoppingList(getShoppingList());
    toast.success('Recette ajoutée à votre liste de courses');
  };

  const deleteFromShoppingListAndNotify = (recipeId: string) => {
    deleteRecipeFromShoppingList(recipeId);
    setShoppingList(getShoppingList());
    toast.success('Recette supprimée de votre liste de courses');
  };

  const shoppingListContainsRecipe = (recipeId: string) => {
    return shoppingList.some(item => item.id === recipeId);
  };

  const clearShoppingListItems = () => {
    clearShoppingList();
    setShoppingList(getShoppingList());
  };

  return {
    addToShoppingListAndNotify,
    deleteFromShoppingListAndNotify,
    shoppingList,
    setShoppingList,
    shoppingListRecipes,
    shoppingListContainsRecipe,
    clearShoppingListItems,
  };
};

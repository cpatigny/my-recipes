import { createContext, useContext, useState } from 'react';
import { addToShoppingList, clearShoppingList, deleteRecipeFromShoppingList, getShoppingList, updateShoppingListItem } from '../helpers/shoppingList.helpers';
import { useRecipes } from './RecipesContext';
import { useToast } from './ToastContext';
import { ShoppingList, ShoppingListItem, ShoppingListRecipeWithId } from '../types/shoppingList';

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

  const shoppingListRecipes: ShoppingListRecipeWithId[] = [];
  shoppingList.forEach(item => {
    const recipe = recipes && recipes[item.id];
    if (!recipe) return;
    shoppingListRecipes.push({
      ...recipe,
      id: item.id,
      shoppingListServingsNb: item.servingsNb,
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

  const getRecipe = (recipeId: string) => {
    const recipe = shoppingList.find(item => item.id === recipeId);
    if (!recipe) {
      throw new Error('No recipe matches provided id');
    }
    return recipe;
  };

  const incrementServingsNb = (recipeId: string) => {
    const recipe = getRecipe(recipeId);
    const currentNb = recipe.servingsNb;
    const newServingsNb = currentNb + 1;
    updateShoppingListItem(recipeId, newServingsNb);
    setShoppingList(getShoppingList());
  };

  const decrementServingsNb = (recipeId: string) => {
    const recipe = getRecipe(recipeId);
    const currentNb = recipe.servingsNb;
    let newServingsNb = 0;
    if (currentNb === 1) {
      newServingsNb = 1;
    } else {
      newServingsNb = currentNb - 1;
    }
    updateShoppingListItem(recipeId, newServingsNb);
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
    incrementServingsNb,
    decrementServingsNb,
  };
};

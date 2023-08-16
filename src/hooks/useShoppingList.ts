import { useEffect, useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import {
  ShoppingListItem,
  addToShoppingList,
  deleteRecipeFromShoppingList,
  getShoppingList,
  setShoppingListStorage,
} from '../helpers/shoppingList.helpers';
import { useRecipes } from '../contexts/RecipesContext';
import { Recipe } from '../types/recipe';

export const useShoppingList = () => {
  const [shoppingList, setShoppingList] = useState(getShoppingList());

  const { toast } = useToast();
  const { recipes } = useRecipes();

  const shoppingListRecipes: Recipe[] = [];
  shoppingList.forEach(item => {
    const recipe = recipes && recipes[item.id];
    if (!recipe) return;
    shoppingListRecipes.push({ ...recipe, nbServings: item.servingsNb.toString() });
  });

  useEffect(() => {
    setShoppingListStorage(shoppingList);
  }, [shoppingList]);

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

  return {
    addToShoppingListAndNotify,
    deleteFromShoppingListAndNotify,
    shoppingList,
    setShoppingList,
    shoppingListRecipes,
    shoppingListContainsRecipe,
  };
};

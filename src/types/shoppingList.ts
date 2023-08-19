import { RecipeWithId } from './recipe';

export interface ShoppingListItem {
  id: string;
  servingsNb: number;
}

export type ShoppingList = ShoppingListItem[];

export interface ShoppingListRecipeWithId extends RecipeWithId {
  shoppingListServingsNb: number;
}

export interface Ingredient {
  position: number;
  quantity: number | '';
  unit: string;
  name: string;
  groupId: string | false;
}

export interface IngredientWithId extends Ingredient {
  id: string;
}

export interface Ingredients {
  [key: string]: Ingredient;
}

export interface IngredientFormData {
  quantity: string;
  unit: string;
  name: string;
}

export interface Group {
  position: number;
  name: string;
}

export interface Groups {
  [key: string]: Group;
}

export interface GroupWithId extends Group {
  id: string;
}

export interface GroupWithIngredients {
  id: string;
  position: number;
  name: string;
  ingredients: IngredientWithId[];
}

export interface Recipe {
  title: string;
  slug: string;
  imageName: string | false;
  category: string;
  nbServings?: string;
  servingsUnit?: string;
  ingredients: string | Ingredients;
  groups?: Groups;
  content: string;
  createdAt?: number;
}

export interface Recipes {
  [key: string]: Recipe;
}

export interface RecipeWithId extends Recipe {
  id: string;
}

export interface RecipeFormData extends Omit<Recipe, 'createdAt'> {
  createdAt: number | false;
}

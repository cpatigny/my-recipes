export interface RecipeIngredient {
  position: number;
  quantity: number | '';
  unitId?: string | false;
  detailsId: string;
  groupId: string | false;
}

export interface RecipeIngredientWithId extends RecipeIngredient {
  id: string;
}

export interface RecipeIngredients {
  [key: string]: RecipeIngredient;
}

export interface RecipeIngredientFormData {
  quantity: string;
  unitId: string | false;
  detailsId: string;
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
  ingredients: RecipeIngredientWithId[];
}

export interface Recipe {
  title: string;
  slug: string;
  imageName: string | false;
  category: string;
  nbServings?: string;
  servingsUnit?: string;
  ingredients: string | RecipeIngredients;
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

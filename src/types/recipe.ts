export interface RecipeIngredient {
  position: number;
  quantity: number | false;
  unitId: string | false;
  detailsId: string;
  groupId: string | false;
  preposition: string | false;
  additionalInfo: string | false;
}

export interface RecipeIngredientWithId extends RecipeIngredient {
  id: string;
}

export interface RecipeIngredients {
  [key: string]: RecipeIngredient;
}

export interface RecipeIngredientFormData {
  quantity: string;
  unitId: string;
  detailsId: string;
  preposition: string;
  additionalInfo: string;
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
  categoryId: string | false;
  cookTimeInMins: number | false;
  nbServings?: string;
  servingsUnit?: string;
  ingredients: string | RecipeIngredients;
  groups?: Groups;
  content: string;
  createdAt: number;
}

export interface Recipes {
  [key: string]: Recipe;
}

export interface RecipeWithId extends Recipe {
  id: string;
}

export interface RecipeFormData extends Omit<Recipe, 'createdAt' | 'groups'> {
  createdAt: number | false;
  groups: Groups | null;
}

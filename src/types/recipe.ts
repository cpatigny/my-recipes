export interface Recipe {
  category: string;
  content: string;
  createdAt?: number;
  imageName: string | false;
  ingredients: string;
  slug: string;
  title: string;
}

export interface Recipes {
  [key: string]: Recipe;
}

export interface RecipeWithId extends Recipe {
  id: string;
}

export interface RecipeFormData {
  title: string;
  slug: string;
  imageName: string| false;
  category: string;
  ingredients: string;
  content: string;
  createdAt: number | false;
}

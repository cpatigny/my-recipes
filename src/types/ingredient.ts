export interface Ingredient {
  singular: string;
  plural: string;
}

export interface IngredientWithId extends Ingredient {
  id: string;
}

export interface Ingredients {
  [key: string]: Ingredient;
}

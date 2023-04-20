export interface IngredientDetails {
  singular: string;
  plural: string;
}

export interface IngredientDetailsWithId extends IngredientDetails {
  id: string;
}

export interface IngredientsDetails {
  [key: string]: IngredientDetails;
}

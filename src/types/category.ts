export interface Category {
  name: string;
  slug: string;
}

export interface Categories {
  [key: string]: Category;
}

export interface CategoryWithId extends Category {
  id: string;
}

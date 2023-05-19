export const ROUTES = {
  HOME: '/',
  RECIPE: '/recette',
  ADD_RECIPE: '/ajouter',
  EDIT_RECIPE: '/modifier',
  CATEGORY: '/categorie',
  ADMIN: '/admin',
  LOGIN: '/login',
  CATEGORIES: '/categories',
  INGREDIENTS: '/ingredients',
  UNITS: '/unités',
  NOT_FOUND: '/404',
} as const;

export const ROUTES_WITH_PARAMS = {
  ...ROUTES,
  RECIPE: `${ROUTES.RECIPE}/:slug`,
  EDIT_RECIPE: `${ROUTES.EDIT_RECIPE}/:slug`,
  CATEGORY: `${ROUTES.CATEGORY}/:slug`,
} as const;

export const getRecipePath = (slug: string) => `${ROUTES.RECIPE}/${slug}`;
export const getEditRecipePath = (slug: string) => `${ROUTES.EDIT_RECIPE}/${slug}`;
export const getCategoryPath = (slug: string) => `${ROUTES.CATEGORY}/${slug}`;

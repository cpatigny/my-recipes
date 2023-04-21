export const ROUTES = {
  HOME: '/',
  RECIPE: '/recipe',
  ADD_RECIPE: '/ajouter',
  EDIT_RECIPE: '/modifier',
  CATEGORY: '/categorie',
  ADMIN: '/admin',
  LOGIN: '/login',
  CATEGORIES: '/categories',
  INGREDIENTS: '/ingredients',
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

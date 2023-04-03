import { CategoryWithId, Categories } from '../../types/category';

const getCategoryBySlug = (categories: Categories, slug: string): CategoryWithId | null => {
  const matchingCategoryKey = Object
    .keys(categories)
    .find(key => categories[key]?.slug === slug);

  if (!matchingCategoryKey) return null;

  const matchingCategory = categories[matchingCategoryKey];

  if (!matchingCategory) return null;

  return {
    id: matchingCategoryKey,
    ...matchingCategory,
  };
};

export default getCategoryBySlug;

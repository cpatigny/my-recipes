import { DEFAULT_CATEGORY } from '../../components/RecipeMultiStepForm/InformationForm';
import { Categories } from '../../types/category';

const getCategoryName = (categoryId: string | false, categories: Categories | null) => {
  if (!categories || !categoryId) {
    return DEFAULT_CATEGORY.name;
  }

  const category = categories[categoryId];

  if (!category) {
    return DEFAULT_CATEGORY.name;
  }

  return category.name;
};

export default getCategoryName;

import generateKey from './generateKey';

const generateIngredientKey = (recipeId: string) => {
  const path = `recipes/${recipeId}/groups`;
  return generateKey(path);
};

export default generateIngredientKey;

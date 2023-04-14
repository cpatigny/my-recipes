import generateKey from './generateKey';

const generateGroupKey = (recipeId: string) => {
  const path = `recipes/${recipeId}/`;
  return generateKey(path);
};

export default generateGroupKey;

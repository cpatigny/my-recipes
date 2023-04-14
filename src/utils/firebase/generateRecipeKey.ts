import generateKey from './generateKey';

const generateRecipeKey = () => {
  const path = 'recipes';
  return generateKey(path);
};

export default generateRecipeKey;

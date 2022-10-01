import removeAccents from './removeAccents';

const strContains = (str, strToContain) => {
  const strWithoutAccentsUppercase = removeAccents(str).toUpperCase();
  const strToContainWithoutAccentsUppercase = removeAccents(strToContain).toUpperCase();
  return strWithoutAccentsUppercase.includes(strToContainWithoutAccentsUppercase);
};

export default strContains;

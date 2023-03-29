import removeAccents from './removeAccents';
import replaceSpecialCharsWithDash from './replaceSpecialCharsWithDash';
import trim from './trim';

/**
 * slugify a string and return it.
 * @param {string} str the string to slugify
 */
const slugify = (str: string): string => {
  if (str === '') return '';

  let slugifyStr = trim(str, ' '); // trim spaces
  slugifyStr = slugifyStr.toLowerCase();
  slugifyStr = removeAccents(slugifyStr);
  slugifyStr = replaceSpecialCharsWithDash(slugifyStr);

  slugifyStr = slugifyStr
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  slugifyStr = trim(slugifyStr, '-');

  return slugifyStr;
};

export default slugify;

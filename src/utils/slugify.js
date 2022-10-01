/**
 * slugify a string and return it.
 * @param {string} str the string to slugify
 */
const slugify = str => {
  if (typeof str !== 'string') throw new Error('str parameter must be of type string');
  if (str === '') return '';

  let slugifyStr = str.replace(/^\s+|\s+$/g, ''); // trim
  slugifyStr = slugifyStr.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = `àáäâèéëêìíïîòóöôùúüûñç·/_,:;'`;
  const to = 'aaaaeeeeiiiioooouuuunc-------';

  for (let i = 0, l = from.length; i < l; i += 1) {
    slugifyStr = slugifyStr.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  slugifyStr = slugifyStr
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return slugifyStr;
};

export default slugify;

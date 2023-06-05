export const removeAccents = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const replaceSpecialCharsWithDash = (str: string): string => {
  // we remove accents first to avoid letters with accent being replaced by a dash
  const strWithoutAccents = removeAccents(str);
  return strWithoutAccents.replace(/[^a-zA-Z0-9]/g, '-');
};

export const trim = (string: string, charToTrim: string): string => {
  const regex = new RegExp(`^${charToTrim}+|${charToTrim}+$`, 'g');
  return string.replace(regex, '');
};

/**
 * slugify a string and return it.
 * @param {string} str the string to slugify
 */
export const slugify = (str: string): string => {
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

export const strContains = (str: string, strToContain: string): boolean => {
  const strWithoutAccentsUppercase = removeAccents(str).toUpperCase();
  const strToContainWithoutAccentsUppercase = removeAccents(strToContain).toUpperCase();
  return strWithoutAccentsUppercase.includes(strToContainWithoutAccentsUppercase);
};

/**
 * @param {string} confirmText text that will be displayed to the userData
 * @param {string} wordToEnter word that must be write to confirmText
 * @param {function} onConfirm function that will be executed on confirm
 */
export const confirm = (confirmText: string, wordToEnter: string, onConfirm: () => void): void => {
  let text;
  let quit = false;

  do {
    text = prompt(confirmText);

    if (text === null) quit = true; // user cliked "cancel" button

    if (text === wordToEnter) onConfirm();
  } while (!quit && text !== wordToEnter);
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  const year = date.getFullYear();

  if (day.toString().length < 2) day = `0${day}`;
  if (month.toString().length < 2) month = `0${month}`;

  return `${day}/${month}/${year}`;
};

export const lastCharIs = (str: string, char: string) => {
  const lastChar = str[str.length - 1];
  return lastChar === char;
};

interface ReversableObject<T> {
  [key: string]: T;
}

export const reverseObject = <T>(objectToReverse: ReversableObject<T>): ReversableObject<T> => {
  const reversedObject = {} as ReversableObject<T>;

  Object
    .keys(objectToReverse)
    .reverse()
    .forEach(key => {
      const object = objectToReverse[key];

      if (object) {
        reversedObject[key] = object;
      }
    });

  return reversedObject;
};

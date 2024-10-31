import {
  formatDate,
  lastCharIs,
  removeAccents,
  replaceSpecialCharsWithDash,
  reverseObject,
  slugify,
  strContains,
} from './utils';

describe('removeAccents', () => {
  test('should remove accent on letters', () => {
    const accentLetters = 'àéèêôî';
    expect(removeAccents(accentLetters)).toBe('aeeeoi');
  });
});

describe('replaceSpecialCharsWithDash', () => {
  test('should replace special chars by dash', () => {
    const strWithSpecialChars = 'I like chocolate!';
    expect(replaceSpecialCharsWithDash(strWithSpecialChars)).toBe(
      'I-like-chocolate-',
    );
  });
});

describe('slugify', () => {
  const expectedStr = 'this-is-a-test';

  test('should slugify text', () => {
    const str = 'This is a test';
    expect(slugify(str)).toBe(expectedStr);
  });

  test(`shouldn't have consecutive dashes`, () => {
    const str = 'this !:;      is a test';
    expect(slugify(str)).toBe(expectedStr);
  });

  test(`shouldn't end with dash`, () => {
    const str = 'this is a test !';
    expect(slugify(str)).toBe(expectedStr);
  });
});

describe('strContains', () => {
  const str = 'Random Text';

  test('should be true when string matches', () => {
    const strToContain = 'Random';
    expect(strContains(str, strToContain)).toBe(true);
  });

  test("should be false when string doesn't match", () => {
    const strToContain = 'Something';
    expect(strContains(str, strToContain)).toBe(false);
  });

  test('should be case insensitive', () => {
    const strToContain = 'random text';
    expect(strContains(str, strToContain)).toBe(true);
  });

  test('should ignore accents on letters', () => {
    const strWithAccents = 'aéôï';
    const strToContain = 'ae';
    expect(strContains(strWithAccents, strToContain)).toBe(true);
  });
});

describe('formatDate', () => {
  test('should return the correct format', () => {
    const timestamp = 1685961252224;
    expect(formatDate(timestamp)).toBe('05/06/2023');
  });
});

describe('lastCharIs', () => {
  const str = 'test';

  test('should be true if char match', () => {
    expect(lastCharIs(str, 't')).toBe(true);
  });

  test("should be false if char doesn't match", () => {
    expect(lastCharIs(str, 'a')).toBe(false);
  });

  test('should be case sensitive', () => {
    expect(lastCharIs(str, 'T')).toBe(false);
  });
});

describe('reverseObject', () => {
  test('should reverse object', () => {
    const obj = {
      one: '1',
      two: '2',
      three: '3',
      four: '4',
    };

    const reversedObj = reverseObject(obj);
    const firstObjProperty = Object.keys(reversedObj)[0];
    expect(firstObjProperty).toBe('four');
  });
});

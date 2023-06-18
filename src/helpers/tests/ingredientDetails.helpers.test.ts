// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { getMockIngredientsDetails } from '../../tests-utils/mocks/ingredientsDetails.mock';
import { getMatchingIngredientsDetails } from '../ingredientDetails.helpers';

describe('getMatchingIngredientsDetails', () => {
  const ingredientsDetails = getMockIngredientsDetails(20);
  const key = Object.keys(ingredientsDetails)[6];
  if (!key) return;

  const item = ingredientsDetails[key];
  if (!item) return;

  test('should return the matching ingredients details using singular', () => {
    const matchingItems = getMatchingIngredientsDetails(item.name, ingredientsDetails);
    expect(matchingItems.some(i => i.id === key)).toBe(true);
  });

  test('should return the matching ingredients details using plural', () => {
    if (!item.plural) {
      throw new Error('item should have plural property defined in order for the test to work');
    }
    const matchingItems = getMatchingIngredientsDetails(item.plural, ingredientsDetails);
    expect(matchingItems.some(i => i.id === key)).toBe(true);
  });

  test('should return empty array if no match', () => {
    const stringWithNoMatch = faker.string.nanoid();
    const matchingItems = getMatchingIngredientsDetails(stringWithNoMatch, ingredientsDetails);
    expect(matchingItems.length).toBe(0);
  });
});

import { getNewItemPosition, sortItemsByPosition } from '../helpers';

describe('getNewItemPosition', () => {
  test('should return the next item position', () => {
    const items = {
      item1: { position: 1 },
      item2: { position: 2 },
      item3: { position: 3 },
    };

    expect(getNewItemPosition(items)).toBe(4);
  });

  test('should return the next item position even if position properties aren\'t consecutive', () => {
    const items = {
      item1: { position: 1 },
      item2: { position: 25 },
      item3: { position: 8 },
    };

    expect(getNewItemPosition(items)).toBe(26);
  });
});

describe('sortItemsByPosition', () => {
  test('should sort items according to their position', () => {
    const items = [
      { position: 16 },
      { position: 25 },
      { position: 8 },
    ];

    const sortedItems = sortItemsByPosition(items);

    expect(sortedItems[0]?.position).toBe(8);
    expect(sortedItems[1]?.position).toBe(16);
    expect(sortedItems[2]?.position).toBe(25);
  });
});

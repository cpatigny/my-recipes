interface Item {
  position: number;
}

interface Items {
  [key: string]: Item;
}

export const getNewItemPosition = (items: Items) => {
  if (Object.keys(items).length === 0) {
    return 0;
  }

  let maxPosition = 0;

  Object.keys(items).forEach(key => {
    const item = items[key];
    if (!item) return;
    if (item.position > maxPosition) {
      maxPosition = item.position;
    }
  });

  return maxPosition + 1;
};

interface ItemWithPosition {
  position: number;
}

export const sortItemsByPosition = <T extends ItemWithPosition>(
  items: T[],
): T[] => {
  return items.sort((itemA, itemB) => itemA.position - itemB.position);
};

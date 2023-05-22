import { useCallback, useEffect, useRef, useState } from 'react';
import { RequiredProps } from './AutocompleteInput';

import './AutocompleteInput.scss';

interface AutocompleteProps<T extends RequiredProps> {
  matchingObjects: T[];
  propertyToShow: keyof T;
  secondaryPropertyToShow?: keyof T;
  noMatchingMsg: string;
  selectItem: (obj: T) => void;
}

export const Autocomplete = <T extends RequiredProps>({
  matchingObjects, propertyToShow, secondaryPropertyToShow, noMatchingMsg, selectItem,
}: AutocompleteProps<T>) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [keyPressed, setKeyPressed] = useState<'ArrowDown' | 'ArrowUp' | null>(null);

  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    // we don't use !selectedIndex because 0 is a falsy value
    if (!listRef || !listRef.current || selectedIndex === null) return;

    const autocompleteListChilds = listRef.current.children;
    const selectedElt = autocompleteListChilds[selectedIndex] as HTMLLIElement;

    if (!selectedElt) return;

    const eltTop = selectedElt.offsetTop;
    const eltHeight = selectedElt.offsetHeight;
    const listScrollTop = listRef.current.scrollTop;
    const listHeight = listRef.current.offsetHeight;

    const eltIsVisible = (eltTop >= listScrollTop)
    && (eltTop <= listScrollTop + listHeight - eltHeight);

    if (eltIsVisible) return;

    if (keyPressed && keyPressed === 'ArrowUp') {
      listRef.current.scrollTop = eltTop;
      return;
    }

    // if user pressed ArrowDown or it's first time pressing key (keyPressed is null)
    listRef.current.scrollTop = eltTop - listHeight + eltHeight;
  }, [selectedIndex, keyPressed]);

  const nextItem = useCallback(() => {
    setSelectedIndex(i => {
      if (i === null) {
        return 0;
      }

      // if selected item is the last item
      if (i + 1 > matchingObjects.length - 1) {
        return 0;
      }

      return i + 1;
    });
  }, [matchingObjects]);

  const previousItem = useCallback(() => {
    setSelectedIndex(i => {
      if (i === null) {
        return matchingObjects.length - 1;
      }

      // if selected item is the first item
      if (i === 0) {
        return matchingObjects.length - 1;
      }

      return i - 1;
    });
  }, [matchingObjects]);

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      previousItem();
      setKeyPressed('ArrowUp');
    }

    if (e.key === 'ArrowDown') {
      nextItem();
      setKeyPressed('ArrowDown');
    }

    if (e.key === 'Enter' && selectedIndex !== null) {
      e.preventDefault();
      const obj = matchingObjects[selectedIndex];
      if (!obj) return;
      selectItem(obj);
    }
  }, [matchingObjects, nextItem, previousItem, selectItem, selectedIndex]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  return (
    <div className='autocomplete-list-container'>
      <ul className='autocomplete-list' ref={listRef}>
        {matchingObjects.length === 0 && (
          <li className='no-match'>{ noMatchingMsg }</li>
        )}
        {matchingObjects.map((obj, index) => {
          const secondaryText = secondaryPropertyToShow && obj[secondaryPropertyToShow] ? ` (${obj[secondaryPropertyToShow]})` : '';
          const text = `${obj[propertyToShow]}${secondaryText}`;
          if (typeof text !== 'string') {
            const textType = typeof text;
            throw new Error(`object[propertyToShow] and object[secondaryPropertyToShow] must be of type string but got ${textType} instead`);
          }
          const isActive = selectedIndex === index;
          return (
            <li key={obj.id} className={`autocomplete-list-item ${isActive ? 'active' : ''}`}>
              <button className='autocomplete-list-item-name' onClick={() => selectItem(obj)}>
                { text }
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

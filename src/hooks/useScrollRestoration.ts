import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SCROLL_STORAGE_KEY = 'scroll-positions';

/**
 * Save scroll position and restore scroll
 */
const useScrollRestoration = () => {
  const [scrollHasBeenRestored, setScrollHasBeenRestored] = useState(false);

  const { key } = useLocation();

  const getScrollPositions = () => {
    const scrollPositionsStr = sessionStorage.getItem(SCROLL_STORAGE_KEY);
    return scrollPositionsStr ? JSON.parse(scrollPositionsStr) : {};
  };

  useEffect(() => {
    const saveScrollPosition = () => {
      // forbid setItem as long as scroll hasn't been restored
      if (!scrollHasBeenRestored) return;

      const scrollPositions = getScrollPositions();
      scrollPositions[key] = window.scrollY.toString();
      sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(scrollPositions));
    };

    window.addEventListener('scroll', saveScrollPosition);

    return () => {
      window.removeEventListener('scroll', saveScrollPosition);
    };
  }, [scrollHasBeenRestored, key]);

  const restoreScroll = () => {
    const scrollValue = getScrollPositions()[key] || 0;
    window.scrollTo(0, +scrollValue);
    setScrollHasBeenRestored(true);
  };

  const deleteScrollStorage = () => {
    sessionStorage.removeItem(SCROLL_STORAGE_KEY);
  };

  return { restoreScroll, deleteScrollStorage };
};

export default useScrollRestoration;
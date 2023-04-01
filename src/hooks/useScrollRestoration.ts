import { useEffect, useState } from 'react';

const SCROLL_STORAGE_KEY = 'scroll';

/**
 * Save scroll position and restore scroll
 */
const useScrollRestoration = () => {
  const [scrollHasBeenRestored, setScrollHasBeenRestored] = useState(false);

  useEffect(() => {
    const saveScroll = () => {
      // forbid setItem as long as scroll hasn't been restored
      if (!scrollHasBeenRestored) return;

      sessionStorage.setItem(SCROLL_STORAGE_KEY, window.scrollY.toString());
    };

    window.addEventListener('scroll', saveScroll);

    return () => {
      window.removeEventListener('scroll', saveScroll);
    };
  }, [scrollHasBeenRestored]);

  // eslint-disable-next-line sonarjs/prefer-immediate-return
  const restoreScroll = () => {
    const scrollValue = sessionStorage.getItem(SCROLL_STORAGE_KEY) || 0;
    window.scrollTo(0, +scrollValue);
    setScrollHasBeenRestored(true);
  };

  return restoreScroll;
};

export default useScrollRestoration;

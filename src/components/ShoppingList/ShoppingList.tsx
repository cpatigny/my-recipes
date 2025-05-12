import { flex } from '../../../styled-system/patterns';
import { token } from '../../../styled-system/tokens';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { ShoppingListContent } from './ShoppingListContent';
import { ShoppingListHeader } from './ShoppingListHeader';

interface ShoppingListProps {
  closeShoppingList: () => void;
  isShow: boolean;
}

export const ShoppingList = ({
  closeShoppingList,
  isShow,
}: ShoppingListProps) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeShoppingList();
    };

    if (isShow) {
      document.addEventListener('keydown', handleKeydown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [closeShoppingList, isShow]);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={flex({
        direction: 'column',
        pos: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        zIndex: '9999',
        transformOrigin: 'bottom right',
        md: {
          top: 'auto',
          left: 'auto',
          bottom: 'fixedButton',
          right: 'fixedButton',
          shadow: '2xl',
          rounded: 'xl',
          overflow: 'hidden',
          h: '45rem',
          w: '35rem',
          maxH: 'var(--max-size)',
          maxW: 'var(--max-size)',
        },
      })}
      style={
        {
          // 100% - bottom value * 2 to also have a space at the top the same size of the bottom one
          '--max-size': `calc(100% - ${token('spacing.fixedButton')} * 2)`,
        } as React.CSSProperties
      }
    >
      <ShoppingListHeader closeShoppingList={closeShoppingList} />
      <ShoppingListContent />
    </motion.div>
  );
};

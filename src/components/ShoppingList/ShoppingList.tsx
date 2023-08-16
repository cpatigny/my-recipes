import { useTransition, animated } from '@react-spring/web';
import { token } from '../../../styled-system/tokens';
import { flex } from '../../../styled-system/patterns';

import { ShoppingListHeader } from './ShoppingListHeader';
import { ShoppingListContent } from './ShoppingListContent';

interface ShoppingListProps {
  closeShoppingList: () => void;
  isShow: boolean;
}

export const ShoppingList = ({ closeShoppingList, isShow }: ShoppingListProps) => {
  const shoppingListTransitions = useTransition(isShow, {
    from: { transform: 'scale(0)', opacity: 0 },
    enter: { transform: 'scale(1)', opacity: 1 },
    leave: { transform: 'scale(0)', opacity: 0 },
    config: { tension: 500, friction: 40 },
  });

  return shoppingListTransitions((style, item) => item && (
    <animated.div
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
          bottom: 'shoppingListPositionValue',
          right: 'shoppingListPositionValue',
          shadow: '2xl',
          rounded: 'xl',
          overflow: 'hidden',
          h: '45rem',
          w: '35rem',
          maxH: 'var(--max-size)',
          maxW: 'var(--max-size)',
        },
      })}
      style={{
        ...{
          // 100% - bottom value * 2 to also have a space at the top the same size of the bottom one
          '--max-size': `calc(100% - ${token('spacing.shoppingListPositionValue')} * 2)`,
        } as React.CSSProperties,
        ...style,
      }}
    >
      <ShoppingListHeader closeShoppingList={closeShoppingList} />
      <ShoppingListContent />
    </animated.div>
  ));
};

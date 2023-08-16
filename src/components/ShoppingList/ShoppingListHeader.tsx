import { center } from '../../../styled-system/patterns';
import { css, cx } from '../../../styled-system/css';

import { Icon } from '../Icon';

export const shoppingListContainer = css({
  px: { base: '1rem', xsm: '1.56rem' },
});

interface ShoppingListHeaderProps {
  closeShoppingList: () => void;
}

export const ShoppingListHeader = ({ closeShoppingList }: ShoppingListHeaderProps) => {
  return (
    <div
      className={cx(
        shoppingListContainer,
        css({
          pos: 'relative',
          bg: 'primary',
          py: '0.3rem',
        }),
      )}
    >
      <h2
        className={css({
          fontSize: '1.2rem',
          fontWeight: '600',
          color: 'white',
          textAlign: 'center',
        })}
      >
        Liste de courses
      </h2>
      <button
        onClick={closeShoppingList}
        className={center({
          pos: 'absolute',
          top: '50%',
          right: '0.4rem',
          transform: 'translateY(-50%)',
          padding: '0.3rem',
          color: 'white',
          transitionDuration: '200ms',
          _hover: { color: 'rgba(255, 255, 255, 0.6)' },
        })}
      >
        <Icon name='close' fontSize='1.4rem' />
      </button>
    </div>
  );
};

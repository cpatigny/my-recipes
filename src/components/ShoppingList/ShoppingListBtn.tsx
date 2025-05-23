import { css } from '../../../styled-system/css';
import listIcon from '../../assets/img/list-icon.svg';

import { Button } from '../Button';

interface ShoppingListBtnProps {
  setShowShoppingList: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShoppingListBtn = ({
  setShowShoppingList,
}: ShoppingListBtnProps) => {
  return (
    <Button
      onClick={() => setShowShoppingList(true)}
      circle={true}
      className={css({
        pos: 'fixed',
        bottom: 'fixedButton',
        right: 'fixedButton',
        p: '0.8rem',
        zIndex: '999',
      })}
    >
      <img
        src={listIcon}
        alt={`Icon d'une liste`}
        className={css({
          w: '2rem',
        })}
      />
    </Button>
  );
};

import { Icon } from '../Icon/Icon';

import './CancelBtn.scss';

interface CancelBtnProps {
  onClick: () => void;
  text: string;
  icon?: boolean;
}

export const CancelBtn = ({ onClick, text, icon = false }: CancelBtnProps) => {
  return (
    <button className='cancel-btn' type='button' onClick={onClick}>
      {icon && <Icon name='close' />}
      { text }
    </button>
  );
};

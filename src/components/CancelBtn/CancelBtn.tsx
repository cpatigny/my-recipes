import { Button } from '../Button';
import { Icon } from '../Icon/Icon';

import './CancelBtn.scss';

interface CancelBtnProps {
  onClick: () => void;
  text: string;
  icon?: boolean;
}

export const CancelBtn = ({ onClick, text, icon = false }: CancelBtnProps) => {
  return (
    <Button
      visual='semiTransparent'
      size='smd'
      type='button'
      onClick={onClick}
    >
      {icon && <Icon name='close' />}
      { text }
    </Button>
  );
};

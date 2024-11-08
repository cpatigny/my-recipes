import { ModalOverlay, ModalOverlayProps } from 'react-aria-components';
import { css } from '../../../styled-system/css';

interface MyModalOverlayProps extends ModalOverlayProps {
  children: React.ReactNode;
}

export const MyModalOverlay = ({ children, ...props }: MyModalOverlayProps) => {
  return (
    <ModalOverlay
      {...props}
      isDismissable
      className={css({
        bg: 'rgba(0, 0, 0, 0.4)',
        p: '4',
        zIndex: '9999999',
        backdropFilter: 'blur(3px)',
        pos: 'fixed',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        overflowY: 'auto',
        display: 'grid',
        placeItems: 'center',
      })}
    >
      {children}
    </ModalOverlay>
  );
};

import { Modal, ModalOverlayProps } from 'react-aria-components';
import { css } from '../../../styled-system/css';

interface MyModalProps extends ModalOverlayProps {
  children: React.ReactNode;
}

export const MyModal = ({ children, ...props }: MyModalProps) => {
  return (
    <Modal {...props} className={css({ w: 'full', maxW: '31.25rem' })}>
      {children}
    </Modal>
  );
};

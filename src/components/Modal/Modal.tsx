import { useEffect } from 'react';

import Overlay from '../Overlay/Overlay';
import ModalContent from './ModalContent';

import './Modal.scss';

interface ModalProps {
  isShow: boolean;
  close: () => void;
  className?: string;
  title: string;
  onCloseAnimationEnd?: () => void;
  children: React.ReactNode;
}

const Modal = ({ isShow, close, className, title, onCloseAnimationEnd, children }: ModalProps) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    if (isShow) {
      document.addEventListener('keydown', handleKeydown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [close, isShow]);

  return (
    <Overlay isShow={isShow} close={close} className='modal-overlay'>
      <ModalContent
        close={close}
        isShow={isShow}
        title={title}
        className={className}
        onCloseAnimationEnd={onCloseAnimationEnd}
      >
        { children }
      </ModalContent>
    </Overlay>
  );
};

export default Modal;

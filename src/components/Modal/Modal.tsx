import { Dialog } from '@headlessui/react';
import { ModalTransition } from './ModalTransition';
import { ModalOverlay } from '../Overlay/OverlayTransition';

import './Modal.scss';

interface ModalProps {
  isShow: boolean;
  onClose: () => void;
  className?: string;
  title: string;
  afterLeave?: () => void; // after leave animation end
  children: React.ReactNode;
}

export const Modal = ({
  isShow, onClose, className, title, afterLeave, children,
}: ModalProps) => {
  return (
    <Dialog static open={isShow} onClose={onClose}>
      <ModalOverlay isShow={isShow} />
      <ModalTransition isShow={isShow} afterLeave={afterLeave}>
        <div className='modal-container'>
          <Dialog.Panel className={`modal ${className || ''}`}>
            <Dialog.Title className='modal-title'>{ title }</Dialog.Title>
            { children }
          </Dialog.Panel>
        </div>
      </ModalTransition>
    </Dialog>
  );
};

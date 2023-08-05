import { Dialog } from '@headlessui/react';
import { css, cx } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';

import { ModalTransition } from './ModalTransition';
import { ModalOverlay } from './ModalOverlay';

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
        <div
          className={flex({
            minH: '100%',
            justify: 'center',
            align: 'center',
            p: '1.2rem',
          })}
        >
          <Dialog.Panel
            className={cx(
              className ?? '',
              css({
                pos: 'relative',
                m: 'auto',
                bg: 'white',
                p: '1.4rem 2rem',
                rounded: '1.25rem',
                w: '100%',
                maxW: '31.25rem',
              }),
            )}
          >
            <Dialog.Title className={css({ mb: '0.5rem', fontSize: '1.7rem' })}>
              { title }
            </Dialog.Title>
            { children }
          </Dialog.Panel>
        </div>
      </ModalTransition>
    </Dialog>
  );
};

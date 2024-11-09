import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef } from 'react';
import { ModalOverlay, ModalOverlayProps } from 'react-aria-components';
import { css } from '../../../styled-system/css';

const MyModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>(
  (props, ref) => (
    <ModalOverlay
      {...props}
      ref={ref}
      isOpen
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
    />
  ),
);

export const MotionModalOverlay = motion.create(MyModalOverlay);

interface MyModalOverlayProps extends Omit<ModalOverlayProps, 'style'> {
  children: React.ReactNode;
}

export const MyMotionModalOverlay = ({
  isOpen,
  children,
  ...props
}: MyModalOverlayProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionModalOverlay
          {...props}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </MotionModalOverlay>
      )}
    </AnimatePresence>
  );
};

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { css, cx } from '../../styled-system/css';

interface OverlayProps {
  isShow: boolean;
  close: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Overlay = ({
  isShow,
  close,
  className,
  children,
}: OverlayProps) => {
  const [shouldCloseModal, setShouldCloseModal] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isShow ? 'hidden' : 'visible';
  }, [isShow]);

  const handleMouseUp = (e: React.MouseEvent) => {
    const clickIsOnOverlay = e.target === e.currentTarget;

    if (shouldCloseModal && clickIsOnOverlay) {
      close();
    }

    setShouldCloseModal(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // if we click on the modal, not the overlay
    if (e.currentTarget !== e.target) {
      setShouldCloseModal(false);
    }
  };

  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown}
          className={cx(
            className,
            css({
              pos: 'fixed',
              top: '0',
              right: '0',
              bottom: '0',
              left: '0',
              bg: 'rgba(0, 0, 0, 0.6)',
              overflowX: 'hidden',
              overflowY: 'auto',
              zIndex: '9999',
              backdropFilter: 'blur(3px)',
            }),
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

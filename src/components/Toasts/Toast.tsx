import { useEffect, useState } from 'react';
import { css } from '../../../styled-system/css';
import { center, flex } from '../../../styled-system/patterns';
import { Toast as ToastType } from '../../contexts/ToastContext';

import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../Icon';

export const Toast = ({ message, status, close }: ToastType) => {
  const [isShow, setIsShow] = useState(true);

  let statusIcon = '';

  switch (status) {
    case 'success':
      statusIcon = 'check_circle';
      break;
    case 'error':
      statusIcon = 'error';
      break;
    default:
      throw new Error('Invalid status prop value');
  }

  useEffect(() => {
    if (!isShow) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setIsShow(false);
      setTimeout(close, 3000); // delete toast from toasts list AFTER animation ends
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isShow, close]);

  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={flex({
            align: 'center',
            pos: 'relative',
            bg: 'white',
            p: { base: '0.8rem 0.5rem 0.8rem 0.6rem', sm: '1rem 0.75rem' },
            mt: '0.4rem',
            pointerEvents: 'auto',
            maxW: '31.25rem',
            rounded: '0.6rem',
            transformOrigin: 'bottom',
            overflow: 'hidden',
            boxShadow:
              '0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05)',
          })}
        >
          <Icon
            data-status={status}
            name={statusIcon}
            className={css({
              fontSize: { base: '1.7rem!', sm: '2rem!' },
              '[data-status=success]&': {
                color: 'success',
              },
              '[data-status=error]&': {
                color: 'danger',
              },
            })}
          />
          <p
            className={css({
              m: { base: '0 0.85rem 0 1rem', sm: '0 0.95rem 0 1.1rem' },
              fontSize: { base: '1rem', sm: '1.1rem' },
            })}
          >
            {message}
          </p>
          <button
            onClick={() => setIsShow(false)}
            className={center()}
            aria-label='Fermer le message'
          >
            <Icon
              name='close'
              className={css({
                fontSize: { base: '1.4rem', sm: '1.6rem' },
                color: 'text',
              })}
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

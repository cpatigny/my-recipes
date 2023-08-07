import { vstack } from '../../../styled-system/patterns';
import { Toast as ToastType } from '../../contexts/ToastContext';

import { Toast } from './Toast';

export const Toasts = ({ toasts }: { toasts: ToastType[] }) => {
  return (
    <div
      className={vstack({
        pos: 'fixed',
        zIndex: '9999',
        bottom: '0.9rem',
        left: '0.5rem',
        right: '0.5rem',
        pointerEvents: 'none',
        sm: {
          bottom: '1rem',
          left: '1rem',
          right: '1rem',
        },
      })}
    >
      {toasts.map(toast => (
        <Toast {...toast} key={toast.key} />
      ))}
    </div>
  );
};

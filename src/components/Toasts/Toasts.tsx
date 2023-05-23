import { Toast as ToastType } from '../../contexts/ToastContext';
import { Toast } from './Toast';

import './Toasts.scss';

export const Toasts = ({ toasts }: { toasts: ToastType[] }) => {
  return (
    <div className='toasts-container'>
      {toasts.map(toast => (
        <Toast {...toast} key={toast.key} />
      ))}
    </div>
  );
};

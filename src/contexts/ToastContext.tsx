import { createContext, useContext, useState } from 'react';

import { Toasts } from '../components/Toasts/Toasts';

type Status = 'success' | 'error';

export interface Toast {
  key: string;
  message: string;
  status: Status;
  close: () => void;
}

interface ToastContextValues {
  setToasts: React.Dispatch<React.SetStateAction<Toast[]>>;
}

const ToastContext = createContext<ToastContextValues | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  return (
    <ToastContext.Provider value={{ setToasts }}>
      {children}
      <Toasts toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { setToasts } = context;

  const deleteToast = (key: string) => {
    setToasts(toasts => toasts.filter(toast => toast.key !== key));
  };

  const createToast = (message: string, status: Status) => {
    // eslint-disable-next-line sonarjs/pseudo-random
    const key = Math.random().toString(36).substring(2, 11);

    const newToast: Toast = {
      key,
      message,
      status,
      close: () => deleteToast(key),
    };

    setToasts(prevToasts => [...prevToasts, newToast]);
  };

  const toast = {
    error: (message: string) => createToast(message, 'error'),
    success: (message: string) => createToast(message, 'success'),
  };

  return { toast };
};

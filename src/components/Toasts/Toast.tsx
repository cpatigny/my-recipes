import { animated, useTransition } from '@react-spring/web';
import { useState } from 'react';
import { Toast as ToastType } from '../../contexts/ToastContext';

import { Icon } from '../Icon/Icon';

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

  const popUpTransitions = useTransition(isShow, {
    from: { opacity: 0, transform: 'scaleY(0)' },
    enter: { opacity: 1, transform: 'scaleY(1)' },
    leave: { opacity: 0, transform: 'scaleY(0)' },
    onRest: () => setTimeout(() => setIsShow(false), 3000),
    onDestroyed: close,
    config: { tension: 360, friction: 50 },
  });

  return popUpTransitions((style, item) => item && (
    <animated.div className={`toast ${status}`} style={style}>
      <Icon name={statusIcon} className='outline status-icon' />
      <p className='toast-message'>{ message }</p>
      <button onClick={() => setIsShow(false)} className='close-toast' aria-label='Fermer le message'>
        <Icon name='close' className='close-icon' />
      </button>
    </animated.div>
  ));
};

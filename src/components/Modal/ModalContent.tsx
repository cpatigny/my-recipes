import { useTransition, animated } from '@react-spring/web';

import { Icon } from '../Icon/Icon';

interface ModalContentProps {
  close: () => void;
  isShow: boolean;
  className?: string;
  title: string;
  afterLeave?: () => void;
  children: React.ReactNode;
}

export const ModalContent = ({
  close, isShow, className, title, afterLeave, children,
}: ModalContentProps) => {
  const modalTransitions = useTransition(isShow, {
    from: { transform: 'translateY(-100px)' },
    enter: { transform: 'translateY(0px)' },
    leave: { transform: 'translateY(-100px)' },
    onDestroyed: afterLeave,
    config: { tension: 500, friction: 35 },
  });

  return modalTransitions((style, item) => item && (
    <animated.div className={`modal ${className || ''}`} style={style}>
      <div className='modal-top'>
        <h2 className='modal-title'>{ title }</h2>
        <button onClick={close} className='close-modal' type='button'>
          <Icon name='close' className='close-icon' />
        </button>
      </div>
      { children }
    </animated.div>
  ));
};

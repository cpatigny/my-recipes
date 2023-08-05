import { useTransition, animated } from '@react-spring/web';
import { css } from '../../../styled-system/css';

interface ModalContentProps {
  isShow: boolean;
  afterLeave?: () => void;
  children: React.ReactNode;
}

export const ModalTransition = ({
  isShow, afterLeave, children,
}: ModalContentProps) => {
  const modalTransitions = useTransition(isShow, {
    from: { transform: 'translateY(-100px)', opacity: 0 },
    enter: { transform: 'translateY(0px)', opacity: 1 },
    leave: { transform: 'translateY(-100px)', opacity: 0 },
    onDestroyed: item => {
      if (item && afterLeave) {
        afterLeave();
      }
    },
    config: { tension: 360, friction: 42 },
  });

  return modalTransitions((style, item) => item && (
    <animated.div
      style={style}
      className={css({
        pos: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        zIndex: '999',
        overflowY: 'auto',
      })}
    >
      { children }
    </animated.div>
  ));
};

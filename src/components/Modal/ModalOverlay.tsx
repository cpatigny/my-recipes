import { animated, useTransition } from '@react-spring/web';
import { css } from '../../../styled-system/css';

interface OverlayTransitionProps {
  isShow: boolean;
}

export const ModalOverlay = ({ isShow }: OverlayTransitionProps) => {
  const overlayTransitions = useTransition(isShow, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 360, friction: 42 },
  });

  return overlayTransitions((style, item) => item && (
    <animated.div
      style={style}
      aria-hidden='true'
      className={css({
        pos: 'fixed',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        p: { base: '0.6rem', xsm: '1.2rem' },
        bg: 'rgba(0, 0, 0, 0.6)',
        overflowX: 'hidden',
        overflowY: 'auto',
        backdropFilter: 'blur(3px)',
      })}
    />
  ));
};

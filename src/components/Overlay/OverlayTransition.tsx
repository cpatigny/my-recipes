import { animated, useTransition } from '@react-spring/web';

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
    <animated.div style={style} className='overlay modal-overlay' aria-hidden='true' />
  ));
};

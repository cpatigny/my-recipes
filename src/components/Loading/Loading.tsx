import { css, cx } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';

import './Loading.scss';

const dotStyles = css({
  bg: 'primary',
  rounded: 'full',
  w: '1.125rem',
  h: '1.125rem',
  m: '0 0.5rem',
  transform: 'scale(0)',
  animation: 'scaleUp 1.5s ease-in-out infinite',
});

export const Loading = () => (
  <div
    className={flex({
      bg: 'bg',
      pos: 'fixed',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      overflow: 'hidden',
      direction: 'column',
      justify: 'center',
      align: 'center',
    })}
  >
    <div className={flex()}>
      <div className={dotStyles}></div>
      <div className={cx(dotStyles, css({ animationDelay: '0.2s' }))}></div>
      <div className={cx(dotStyles, css({ animationDelay: '0.4s' }))}></div>
    </div>
    <p className={css({ fontSize: '1rem', mt: '1rem' })}>Chargement...</p>
  </div>
);

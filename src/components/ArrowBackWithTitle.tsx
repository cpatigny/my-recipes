import { css } from '../../styled-system/css';
import { grid } from '../../styled-system/patterns';

import { GoBack } from './GoBack';

export const ArrowBackWithTitle = ({ title }: { title: string }) => {
  return (
    <div
      className={grid({
        gridTemplateColumns: {
          base: '1rem 1fr 1rem',
          xsm: '1.5rem 1fr 1.5rem',
          sm: '2rem 1fr 2rem',
          md: '3rem 1fr 3rem',
        },
        gap: { base: '0 1rem', xsm: '0 1.5rem', md: '0 2rem' },
        m: '1.6rem 0 2.2rem',
        alignItems: 'center',
      })}
    >
      <GoBack />
      <h1
        className={css({
          fontSize: 'clamp(1.6rem, -1.01rem + 9.28vw, 3.05rem)',
          justifySelf: 'center',
        })}
      >
        { title }
      </h1>
    </div>
  );
};

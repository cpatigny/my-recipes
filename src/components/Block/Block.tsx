import { css, cx } from '../../../styled-system/css';

import './Block.scss';

interface BlockProps {
  className?: string;
  children: React.ReactNode;
}

export const Block = ({ className, children }: BlockProps) => {
  return (
    <div
      className={cx(
        className,
        css({
          bg: 'white',
          rounded: '1.2rem',
          shadow: '0 1px 2px 0 rgba(0,0,0,.08)',
          p: { base: '1rem 1.1rem', xsm: '1.3rem 1.5rem' },
          '&:not(:last-child)': {
            mb: '1.5rem',
          },
        }),
      )}
    >
      { children }
    </div>
  );
};

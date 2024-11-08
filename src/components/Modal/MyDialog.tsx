import { Dialog, DialogProps } from 'react-aria-components';
import { css } from '../../../styled-system/css';

export const MyDialog = ({ ...props }: DialogProps) => {
  return (
    <Dialog
      {...props}
      className={css({
        pos: 'relative',
        m: 'auto',
        bg: 'white',
        p: '1.4rem 2rem',
        rounded: '1.25rem',
      })}
    />
  );
};

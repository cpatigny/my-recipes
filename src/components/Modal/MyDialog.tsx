import { motion } from 'framer-motion';
import { Dialog, DialogProps } from 'react-aria-components';
import { css } from '../../../styled-system/css';

export const MyDialog = ({ ...props }: DialogProps) => {
  return (
    <motion.div
      initial={{ transform: 'translateY(-100px)', opacity: 0 }}
      animate={{ transform: 'translateY(0px)', opacity: 1 }}
      exit={{ transform: 'translateY(-100px)', opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
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
    </motion.div>
  );
};

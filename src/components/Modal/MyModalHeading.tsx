import { Heading } from 'react-aria-components';
import { css } from '../../../styled-system/css';

export const MyModalHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <Heading slot='title' className={css({ mb: '0.5rem', fontSize: '1.7rem' })}>
      {children}
    </Heading>
  );
};

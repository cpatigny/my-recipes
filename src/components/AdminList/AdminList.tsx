import { css } from '../../../styled-system/css';

export const AdminList = ({ children }: { children: React.ReactNode }) => {
  return <ul className={css({ mt: '2rem' })}>{children}</ul>;
};

import { css } from '../../styled-system/css';

export const SecondaryText = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className={css({ fontWeight: '300', color: 'text.disabled' })}>
      { children }
    </p>
  );
};

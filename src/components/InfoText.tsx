import { css } from '../../styled-system/css';

export const InfoText = ({ children }: { children: React.ReactNode }) => {
  return (
    <i className={css({ fontSize: '0.85rem', color: '#6b7280', fontStyle: 'italic' })}>
      { children }
    </i>
  );
};

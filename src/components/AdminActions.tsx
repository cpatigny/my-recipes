import { flex } from '../../styled-system/patterns';

export const AdminActions = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={flex({
        gap: '0.5rem',
        flexShrink: '0',
        ml: '1rem',
      })}
    >
      {children}
    </div>
  );
};

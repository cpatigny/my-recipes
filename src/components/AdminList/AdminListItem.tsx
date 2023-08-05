import { flex } from '../../../styled-system/patterns';

export const AdminListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <li
      className={flex({
        justify: 'space-between',
        align: 'center',
        p: '0.5rem 0.4rem',
        borderBottom: '1px solid rgba(0, 0, 0, .1)',
        _first: {
          borderTop: '1px solid rgba(0, 0, 0, .1)',
        },
      })}
    >
      { children }
    </li>
  );
};

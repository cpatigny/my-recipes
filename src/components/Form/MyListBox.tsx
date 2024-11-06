import { ListBox, ListBoxProps } from 'react-aria-components';
import { css } from '../../../styled-system/css';

function MyListBox<T extends object>({ children, ...props }: ListBoxProps<T>) {
  return (
    <ListBox
      {...props}
      className={css({
        w: 'var(--trigger-width)',
        mt: '0.3rem',
        rounded: 'lg',
        bg: 'white',
        shadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        overflowY: 'auto',
        maxH: '6rem',
      })}
    >
      {children}
    </ListBox>
  );
}

export default MyListBox;

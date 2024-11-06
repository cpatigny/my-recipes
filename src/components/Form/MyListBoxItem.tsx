import { ListBoxItem, ListBoxItemProps } from 'react-aria-components';
import { css } from '../../../styled-system/css';
import { Icon } from '../Icon';

interface MyListBoxItemProps extends ListBoxItemProps {
  anOptionIsSelected: boolean;
  textValue: string;
  children: React.ReactNode;
}

function MyListBoxItem({
  anOptionIsSelected,
  textValue,
  children,
  ...props
}: MyListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={css({
        p: '0.3rem 0.8rem',
        w: '100%',
        fontSize: '1.1rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        pos: 'relative',

        '&[data-focused]': {
          bg: 'orange.450',
          color: 'white',
        },

        '&[data-selected]': {
          fontWeight: '600',
        },

        '&[data-focused][data-selected] .icon': {
          color: 'white',
        },
      })}
      textValue={textValue}
    >
      <Icon
        name='check'
        aria-hidden='true'
        className={css({
          display: 'none!',
          pos: 'absolute',
          color: 'orange.450',
          fontSize: '1.2rem!',

          '[data-selected] &': { display: 'block!' },
        })}
      />
      <span
        data-an-option-is-selected={anOptionIsSelected}
        className={css({
          '&[data-an-option-is-selected=true]': { pl: '1.5rem' },
        })}
      >
        {children}
      </span>
    </ListBoxItem>
  );
}

export default MyListBoxItem;

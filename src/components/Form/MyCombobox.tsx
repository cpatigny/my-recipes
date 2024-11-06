import { forwardRef } from 'react';
import { ComboBox, ComboBoxProps, Input, Popover } from 'react-aria-components';
import { css } from '../../../styled-system/css';

type RefType = HTMLInputElement | null;

interface MyComboboxProps<T extends object> extends ComboBoxProps<T> {
  children: React.ReactNode;
  placeholder: string;
  error: boolean;
}

const MyCombobox = forwardRef<RefType, MyComboboxProps<object>>(
  function MyCombobox({ placeholder, error, children, ...props }, inputRef) {
    return (
      <ComboBox {...props}>
        <div className={css({ pos: 'relative' })}>
          <Input
            placeholder={placeholder}
            data-error={error}
            className={css({
              py: '0.375rem',
              borderBottom: '1px solid #dadce0',
              outline: 'none',
              transitionDuration: '200ms',
              _placeholder: { color: '#6D6D6D' },

              '&[data-error=true]': {
                borderColor: 'danger',
                _placeholder: { color: 'danger' },
              },

              '&[data-error=false]': {
                _focus: {
                  borderColor: 'primary',
                },
              },
            })}
            ref={inputRef}
          />
        </div>
        <Popover>{children}</Popover>
      </ComboBox>
    );
  },
);

export default MyCombobox;

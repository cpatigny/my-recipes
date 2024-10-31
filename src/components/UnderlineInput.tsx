import { forwardRef } from 'react';
import { css, cx } from '../../styled-system/css';

const transitionDuration = '200ms';
const onFocus = {
  transform: 'scale(0.8) translateY(-100%)',
  top: '0',
};

interface UnderlineInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  error?: boolean;
  name: string;
  className?: string;
}

type RefType = HTMLInputElement | null;

const UnderlineInput = forwardRef<RefType, UnderlineInputProps>(
  (props, ref) => {
    const { labelText, error, name, className, ...inputProps } = props;

    return (
      <label
        data-error={!!error}
        className={cx(
          'group',
          className,
          css({ pos: 'relative', m: '0.7rem 0 0.2rem' }),
        )}
      >
        <input
          {...inputProps}
          ref={ref}
          name={name}
          placeholder=' '
          className={cx(
            'peer',
            css({
              p: '0.375rem 0',
              borderBottom: '1px solid #dadce0',
              outline: 'none',
              transitionDuration,
              '[data-error=true] &': {
                borderColor: 'danger',
              },
              _focus: {
                borderColor: 'primary',
              },
              '&:not(:placeholder-shown) + span': onFocus,
            }),
          )}
        />
        <span
          className={css({
            pos: 'absolute',
            left: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#6D6D6D',
            pointerEvents: 'none',
            transformOrigin: 'left',
            transitionDuration,
            fontSize: '1rem',
            '[data-error=true] &': {
              color: 'danger',
            },
            _peerFocus: {
              color: 'primary',
              ...onFocus,
            },
          })}
        >
          {labelText}
        </span>
      </label>
    );
  },
);

UnderlineInput.displayName = 'UnderlineInput';

export { UnderlineInput };

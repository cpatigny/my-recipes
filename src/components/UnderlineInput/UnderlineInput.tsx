import { forwardRef } from 'react';

import './UnderlineInput.scss';

interface UnderlineInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  error?: boolean;
  name: string;
}

type RefType = HTMLInputElement | null;

const UnderlineInput = forwardRef<RefType, UnderlineInputProps>((props, ref) => {
  const { labelText, error, name, ...inputProps } = props;

  return (
    <label className={`underline-input-container ${name} ${error ? 'error' : ''}`}>
      <input {...inputProps} ref={ref} name={name} placeholder=' ' />
      <span>{ labelText }</span>
    </label>
  );
});

UnderlineInput.displayName = 'UnderlineInput';

export { UnderlineInput };

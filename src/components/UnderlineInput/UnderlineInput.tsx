import './UnderlineInput.scss';

interface UnderlineInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  error?: boolean;
  name: string;
}

const UnderlineInput = ({
  labelText, error, name, ...inputProps
}: UnderlineInputProps) => (
  <label className={`underline-input-container ${name} ${error ? 'error' : ''}`}>
    <input {...inputProps} name={name} placeholder=' ' />
    <span>{ labelText }</span>
  </label>
);

export default UnderlineInput;

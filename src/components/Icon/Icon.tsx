interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  className?: string;
}

const Icon = ({ name, className = '', ...props }: IconProps) => (
  <span className={`material-icons-round ${className}`} {...props}>
    { name }
  </span>
);

export default Icon;

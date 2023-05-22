interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  className?: string;
}

export const Icon = ({ name, className = '', ...props }: IconProps) => (
  <span className={`material-icons-round ${className}`} {...props}>
    { name }
  </span>
);

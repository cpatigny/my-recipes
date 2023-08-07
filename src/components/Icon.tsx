import { css, cx } from '../../styled-system/css';
import { CssProperties } from '../../styled-system/types/system-types';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  className?: string;
  fontSize?: CssProperties['fontSize'],
}

export const Icon = ({ name, className = '', fontSize, ...props }: IconProps) => (
  <span
    {...props}
    className={cx(
      'icon material-icons-round',
      className,
      css({ fontSize: `${fontSize}!` }),
    )}
  >
    { name }
  </span>
);

import { css } from '../../../styled-system/css';

interface RecipeOptionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const RecipeOptionButton = ({
  children,
  ...props
}: RecipeOptionButtonProps) => (
  <button
    {...props}
    className={css({
      display: 'flex',
      color: 'text.disabled',
      p: '1',
    })}
  >
    {children}
  </button>
);

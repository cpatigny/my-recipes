import { css } from '../../../styled-system/css';

interface RecipeOptionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
  children: React.ReactNode;
}

export const RecipeOptionButton = ({
  active,
  children,
  ...props
}: RecipeOptionButtonProps) => (
  <button
    {...props}
    data-active={active}
    className={css({
      display: 'flex',
      transitionDuration: '200ms',
      color: 'text.disabled',
      p: '1',
      '&[data-active=true]': {
        color: '{colors.orange.400}',

        _hover: {
          color: '{colors.orange.200}',
        },
      },
      '&[data-active=false]:hover': {
        color: 'text.secondary',
      },
    })}
  >
    {children}
  </button>
);

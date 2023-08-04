import { RecipeVariantProps, cva } from '../../styled-system/css';
import { styled } from '../../styled-system/jsx';

const primaryColor = 'colors.primary';
const dangerColor = 'colors.danger';
const editColor = 'colors.sky.500';

export const buttonStyle = cva({
  base: {
    display: 'flex',
    fontFamily: 'default',
    fontWeight: '400',
    rounded: 'full',
    transitionDuration: '300ms',
    fontSize: '1.1rem',
  },
  variants: {
    visual: {
      solid: {
        border: 'none',
        color: 'white',
        bg: 'var(--background-color)',
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'var(--border-color)',
        color: 'var(--color)',
        bg: 'transparent',
        _hover: {
          bg: 'lightPrimary',
        },
      },
    },
    size: {
      sm: {
        p: '0.5rem 0.75rem',
      },
      md: {
        p: '0.7rem 1.8rem',
      },
    },
    color: {
      primary: {
        '--background-color': primaryColor,
        '--border-color': primaryColor,
        '--color': primaryColor,
      },
      danger: {
        '--background-color': dangerColor,
        '--border-color': dangerColor,
        '--color': dangerColor,
      },
      edit: {
        '--background-color': editColor,
        '--border-color': editColor,
        '--color': editColor,
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  defaultVariants: {
    visual: 'solid',
    color: 'primary',
    size: 'sm',
  },
});

export type ButtonVariants = RecipeVariantProps<typeof buttonStyle>;

export const Button = styled('button', buttonStyle);

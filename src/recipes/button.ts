import { cva, RecipeVariantProps } from '../../styled-system/css';

const primaryColor = 'colors.orange.450';
const dangerColor = 'colors.danger';
const editColor = 'colors.edit';

export const button = cva({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
          bg: 'var(--light-bg-color)',
        },
      },
      transparent: {
        border: 'none',
        color: 'var(--color)',
        _hover: {
          bg: 'var(--light-bg-color)',
        },
      },
    },
    size: {
      sm: {
        p: '0.5rem 0.75rem',
        '--padding': '0.2rem',
      },
      md: {
        p: '0.7rem 1.8rem',
        '--padding': '0.3rem',
      },
    },
    color: {
      primary: {
        '--background-color': primaryColor,
        '--border-color': primaryColor,
        '--color': primaryColor,
        '--light-bg-color': 'lightPrimary',
      },
      danger: {
        '--background-color': dangerColor,
        '--border-color': dangerColor,
        '--color': dangerColor,
        '--light-bg-color': 'colors.red.100',
      },
      edit: {
        '--background-color': editColor,
        '--border-color': editColor,
        '--color': editColor,
        '--light-bg-color': 'colors.sky.100',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    circle: {
      true: {
        p: 'var(--padding)',
      },
    },
  },
  defaultVariants: {
    visual: 'solid',
    color: 'primary',
    size: 'sm',
  },
});

export type ButtonVariants = RecipeVariantProps<typeof button>;

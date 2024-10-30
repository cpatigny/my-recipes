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
        '[data-disabled=true]&': {
          bg: 'var(--disabled-bg-color)',
          _hover: { bg: 'var(--disabled-bg-color)' },
        },
        _hover: {
          bg: 'var(--darker-bg-color)',
        },
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
      semiTransparent: {
        border: '1px solid transparent',
        bg: 'var(--light-bg-color)',
        color: 'var(--color)',
        _hover: {
          borderColor: 'var(--border-color)',
        },
      },
      grey: {
        border: 'none',
        color: '#919eab',
        _hover: {
          color: 'var(--color)',
          bg: 'var(--light-bg-color)',
        },
      },
    },
    size: {
      sm: {
        p: '0.5rem 0.75rem',
        '--padding': '0.2rem',
      },
      smd: {
        p: '0.7rem 1.3rem',
        '--padding': '0.25rem',
      },
      md: {
        p: '0.7rem 1.8rem',
        '--padding': '0.3rem',
      },
      lg: {
        p: '5rem 10rem',
        '--padding': '0.4375rem',
      },
    },
    color: {
      primary: {
        '--background-color': primaryColor,
        '--border-color': primaryColor,
        '--color': primaryColor,
        '--light-bg-color': 'colors.lightPrimary',
        '--disabled-bg-color': 'colors.orange.200',
        '--darker-bg-color': 'colors.orange.550',
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
      blackAndWhite: {
        '--background-color': 'rgba(0, 0, 0, 0.7)',
        '--border-color': 'white',
        '--color': 'white',
        '--light-bg-color': 'rgba(0, 0, 0, 0.7)',
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
  compoundVariants: [
    {
      visual: 'semiTransparent',
      color: 'primary',
      css: {
        color: 'primary',
      },
    },
  ],
});

export type ButtonVariants = RecipeVariantProps<typeof button>;

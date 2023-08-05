import { cva, RecipeVariantProps } from '../../styled-system/css';

export const container = cva({
  base: {
    m: '0 auto',
    maxW: '56rem',
    '@media (min-width: 500px)': {
      paddingX: '3rem',
    },
    '@media (min-width: 400px)': {
      px: '2.1875rem',
    },
  },
  variants: {
    type: {
      home: {
        px: '1.5625rem',
      },
      admin: {
        p: '0.2rem 0.7rem',
        '@media (min-width: 425px)': {
          pb: '2rem',
        },
        '@media (min-width: 360px)': {
          p: '0.2rem 1rem',
        },
      },
    },
  },
  defaultVariants: {
    type: 'home',
  },
});

export type ContainerVariants = RecipeVariantProps<typeof container>;

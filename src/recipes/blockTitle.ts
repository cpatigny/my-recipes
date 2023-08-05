import { RecipeVariantProps, cva } from '../../styled-system/css';

export const blockTitle = cva({
  base: {
    mb: '0.5rem',
  },
  variants: {
    size: {
      sm: {
        fontSize: '1.1rem',
        fontWeight: '700',
      },
      lg: {
        fontSize: 'clamp(1.6rem, 1.2632rem + 1.6842vw, 2rem)',
      },
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

export type BlockTitleVariants = RecipeVariantProps<typeof blockTitle>;

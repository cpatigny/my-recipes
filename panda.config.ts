/* eslint-disable */
import { defineConfig, defineTokens } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  jsxFramework: 'react',

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          orange: {
            50: { value: '#FEDFC9' },
            100: { value: '#FDD3B5' },
            200: { value: '#FCBB8D' },
            300: { value: '#FBA366' },
            400: { value: '#FA8B3E' },
            450: { value: '#F9802C' },
            500: { value: '#f97316' },
            550: { value: '#ED6506' },
            600: { value: '#D25905' },
            700: { value: '#9B4204' },
            800: { value: '#642B03' },
            900: { value: '#2D1301' },
          },
        },
        fonts: {
          default: { value: ['Nunito', 'sans-serif'] }
        },
        radii: {
          '2xl': { value: '1.125rem' },
        },
      },
      breakpoints: {
        xsm: '450px',
      },
      keyframes: {
        scaleUp: {
          '0%, 100%': {
            transform: 'scale(0.2)',
          },
          '40%, 50%': {
            transform: 'scale(1)',
          },
        },
      },
    },
    semanticTokens: {
      colors: {
        primary: { value: '{colors.orange.500}' },
        lightPrimary: { value: '#FEEBDE' },
        danger: { value: '{colors.red.500}' },
        success: { value: '{colors.green.500}' },
        edit: { value: '{colors.sky.500}' },
        bg: {
          DEFAULT: { value: '#F7F7F7' },
        },
        text: {
          DEFAULT: { value: '#313746' },
          secondary: { value: '#6b7280' },
          disabled: { value: '#989fac' },
        },
      },
      fontSizes: {
        text: { value: '1.1rem' },
        pageTitle: { value: 'clamp(1.9rem, 1.4453rem + 2.2737vw, 2.44rem)' },
      },
    },
  },

  globalCss: {
    body: {
      fontFamily: 'default',
      bg: 'bg',
    },
    p: {
      fontSize: 'text',
      color: 'text',
    },
    h1: {
      fontWeight: '700',
    },
    button: {
      cursor: 'pointer',
      padding: '0.0625rem 0.375rem',
    },
    input: {
      color: 'text',
      w: '100%',
    },
    'h1, h2, h3, h4, h5, h6, label': {
      color: 'text',
    },
    'h2, h3, h4, h5, h6': {
      fontWeight: '600',
    },
    label: {
      display: 'block',
      fontSize: 'text',
    }
  },

  // The output directory for your css system
  outdir: 'styled-system',
});

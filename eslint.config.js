import eslint from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['src/**/*.{js,ts,jsx,tsx}'],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    jsxA11y.flatConfigs.recommended,
  ],
  plugins: {
    vitest,
  },
  rules: {
    ...vitest.configs.recommended.rules,
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }], // allow to not use error var in catch() statement
  },
});

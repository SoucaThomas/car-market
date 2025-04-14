import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends('next/core-web-vitals', 'next/typescript')];

export default tseslint.config(
  {
    ignores: [
      'dist',
      'build',
      'node_modules',
      'public',
      'coverage',
      'storybook-static',
      'cdk',
      'infra',
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, ...eslintConfig],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
      perfectionist: perfectionist,
      prettier: prettier,
    },
    rules: {
      // ----------------------------------------
      // General
      // ----------------------------------------
      'no-alert': 'off',
      camelcase: 'off',
      'no-console': 'off',
      'no-unused-vars': 'off',
      'no-nested-ternary': 'off',
      'no-param-reassign': 'off',
      'no-underscore-dangle': 'off',
      'no-extra-boolean-cast': 'off',
      'no-restricted-exports': 'off',
      'no-promise-executor-return': 'off',
      'import/prefer-default-export': 'off',
      'prefer-destructuring': ['warn', { object: true, array: false }],

      // ----------------------------------------
      // TypeScript
      // ----------------------------------------
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/consistent-type-exports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',

      // ----------------------------------------
      // React
      // ----------------------------------------
      'react/no-children-prop': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-array-index-key': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-no-duplicate-props': ['off', { ignoreCase: false }],
      'react/jsx-no-useless-fragment': ['off', { allowExpressions: true }],
      'react/no-unstable-nested-components': ['off', { allowAsProps: true }],

      // ----------------------------------------
      // jsx-a11y (if you re-add the plugin)
      // ----------------------------------------
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/control-has-associated-label': 'off',

      // ----------------------------------------
      // Unused Imports
      // ----------------------------------------
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'off',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // ----------------------------------------
      // Perfectionist (sort imports/exports)
      // ----------------------------------------
      'perfectionist/sort-exports': ['warn', { order: 'asc', type: 'line-length' }],
      'perfectionist/sort-named-imports': ['warn', { order: 'asc', type: 'line-length' }],
      'perfectionist/sort-named-exports': ['warn', { order: 'asc', type: 'line-length' }],

      'perfectionist/sort-imports': [
        'warn',
        {
          // Sort strategy
          order: 'asc',
          type: 'line-length',

          // Blank lines between sorted groups
          newlinesBetween: 'always',

          // Define groups in the order we want them
          groups: [
            'style',
            'type',
            ['builtin', 'external'],
            'custom-mui',
            'custom-routes',
            'custom-hooks',
            'custom-utils',
            'internal',
            'custom-components',
            'custom-sections',
            'custom-auth',
            'custom-types',
            // Combine all relative imports in a single group:
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],

          // Must use internalPattern instead of internalRegex
          internalPattern: ['^src/'],

          // Custom group patterns
          customGroups: {
            value: {
              'custom-mui': ['@mui/.*'],
              'custom-auth': ['src/auth/.*'],
              'custom-hooks': ['src/hooks/.*'],
              'custom-utils': ['src/utils/.*'],
              'custom-types': ['src/types/.*'],
              'custom-routes': ['src/routes/.*'],
              'custom-sections': ['src/sections/.*'],
              'custom-components': ['src/components/.*'],
            },
          },
        },
      ],

      // ----------------------------------------
      // react-refresh
      // ----------------------------------------
      'react-refresh/only-export-components': ['off'],

      // ----------------------------------------
      // React Hooks recommended rules
      // ----------------------------------------
      ...reactHooks.configs.recommended.rules,
    },
  }
);

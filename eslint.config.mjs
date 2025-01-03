// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    // 'no-undef': 'error', //causing issues with nuxt autoimports
    'no-console': 'off',

    'arrow-spacing': ['error', { before: true, after: true }],
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-useless-escape': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',

    //stricter linting rules
    semi: 'error',
    'block-scoped-var': 'error',
    'class-methods-use-this': 'error',
    complexity: ['error', 18],
    'default-case': 'error',
    'dot-notation': 'error',
    eqeqeq: 'error',
    'guard-for-in': 'error',
    'no-alert': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'off',
    'no-else-return': 'error',
    'no-empty-function': [
      'error',
      {
        allow: ['constructors']
      }
    ],
    'no-eval': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-lone-blocks': 'error',
    'no-multi-spaces': 'error',
    'no-return-assign': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'off',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true
      }
    ],
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    '@typescript-eslint/no-shadow': 'off',
    'no-prototype-builtins': 'off',
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': 'error',
    'comma-dangle': ['error', 'never'],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    'computed-property-spacing': ['error', 'never'],
    'consistent-this': ['error', 'that'],
    'eol-last': 'error',
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true
      }
    ],
    'max-len': [
      'error',
      {
        code: 600
      }
    ],
    'no-lonely-if': 'error',
    'no-multiple-empty-lines': 'error',
    'one-var-declaration-per-line': ['error', 'always'],
    'no-whitespace-before-property': 'error',
    'no-unneeded-ternary': 'error',
    'no-trailing-spaces': 'error',
    quotes: ['error', 'single'],
    'operator-assignment': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'arrow-body-style': ['error', 'as-needed'],
    // 'no-confusing-arrow': 'error', //causing some issues with prettier
    'no-duplicate-imports': 'error',
    'no-useless-rename': 'error',
    'template-curly-spacing': 'error',
    'no-async-promise-executor': 'off',

    'vue/first-attribute-linebreak': 'off' //causes problems with formatting vue file
  },

  ignores: ['*.config.ts', '*.config.js', 'components.d.ts']
});

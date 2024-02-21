/* eslint-disable @stylistic/max-len */
module.exports = {
  ignorePatterns: ['docs', 'build'],
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import', '@stylistic'],
  root: true,
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@stylistic/max-len': ['warn', { code: 100, comments: 140 }],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
        warnOnUnassignedImports: true,
      },
    ],
    'import/no-unresolved': ['error'],
    // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md#options
    'no-unused-vars': 'off', // you must disable the base rule as it can report incorrect errors
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
};

module.exports = {
  env: {
    es2020: true,
    node: true,
    jest: true,
  },

  globals: {
    __DEV__: true,
    FormData: true,
  },

  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
    project: './tsconfig.json',
    warnOnUnsupportedTypeScriptVersion: false,
  },

  plugins: [
    'react',
    '@typescript-eslint',
    'unused-imports',
  ],

  rules: {
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'import/prefer-default-export': 0,
    'react/no-unused-prop-types': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'unused-imports/no-unused-imports': 'error',
  },
};


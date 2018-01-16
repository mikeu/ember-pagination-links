module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  rules: {
    'indent': ['error', 2],
    'no-trailing-spaces': ['error'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
  }
};

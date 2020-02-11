module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': 'off',
    'prefer-destructuring': 'off',
    'arrow-body-style': 'off',
    'vue': {
      'script-indent': [
        'warn',
        'tab',
        2,
        { 'baseIndent': 1 }
      ]
    },
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      'rules': {
        'indent': 'off',
        'no-underscore-dangle': [2, {'allow': []}]
      },
      env: {
        jest: true,
      },
    },
  ],
};

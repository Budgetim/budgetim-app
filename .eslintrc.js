module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/no-unused-prop-types': 'off',
  },
  plugins: ['prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
};

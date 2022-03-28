export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier', 'react'],
  rules: {
    'max-len': [0, 120, 2, { ignoreUrls: true }],
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'prettier/prettier': 'error',
  },
};

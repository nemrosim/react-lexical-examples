module.exports = {
   env: {
      browser: true,
      es6: true,
      node: true,
   },
   extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      // 'plugin:jsx-a11y/strict',
      'prettier',
   ],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
   },
   plugins: ['react', 'jsx-a11y', '@typescript-eslint'],
   rules: {
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'no-var': 'error',
      'prefer-template': 'error',
      radix: 'error',
      'import/prefer-default-export': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
   },
   overrides: [
      {
         files: [
            '**/*.test.js',
            '**/*.test.jsx',
            '**/*.test.tsx',
            '**/*.spec.js',
            '**/*.spec.jsx',
            '**/*.spec.tsx',
         ],
         env: {
            jest: true,
         },
      },
   ],
};

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['dist/', 'node_modules/'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
};

// module.exports = {
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     project: './tsconfig.json',
//     tsconfigRootDir: __dirname,
//     sourceType: 'module',
//   },
//   plugins: ['@typescript-eslint'],
//   extends: [
//     'plugin:@typescript-eslint/recommended',
//     'plugin:prettier/recommended',
//   ],
//   root: true,
//   env: {
//     node: true,
//     // es2022: true,
//   },
//   ignorePatterns: ['.eslintrc.js'],
//   rules: {
//     '@typescript-eslint/no-explicit-any': 'error',
//     '@typescript-eslint/no-unused-vars': ['warn'],
//     // '@typescript-eslint/explicit-function-return-type': [
//     //   'warn',
//     //   {
//     //     allowExpressions: true,
//     //     allowConciseArrowFunctionExpressionsStartingWithVoid: true,
//     //   },
//     // ],
//     // '@typescript-eslint/explicit-module-boundary-types': 'warn',
//     // '@typescript-eslint/no-floating-promises': 'error',
//     // 'no-duplicate-imports': 'error',
//     // 'import/order': [
//     //   'warn',
//     //   {
//     //     alphabetize: {
//     //       order: 'asc',
//     //       caseInsensitive: true,
//     //     },
//     //     groups: [
//     //       ['builtin', 'external'],
//     //       'internal',
//     //       ['parent', 'sibling', 'index'],
//     //     ],
//     //     'newlines-between': 'always',
//     //   },
//     // ],
//   },
// };

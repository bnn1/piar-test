const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'unused-imports',
    'sonarjs',
    'testing-library',
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'plugin:security/recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/display-name': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: ['case', 'default'], next: '*' },
      {
        blankLine: 'always',
        prev: '*',
        next: ['interface', 'type'],
      },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^next'],
          ['^react'],
          ['^@mui'],
          ['^\\u0000'],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ['^'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.'],
          ['css$', 'css'],
        ],
      },
    ],
    'unused-imports/no-unused-imports': isProd ? 2 : 0,
    'unused-imports/no-unused-vars': [
      isProd ? 2 : 1,
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    'sonarjs/no-duplicate-string': [2, 6],
  },
  overrides: [
    // Only uses Testing Library lint rules in test files
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};

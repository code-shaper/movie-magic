module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    '@code-shaper/eslint-config/strict-react',
    'next/core-web-vitals',
    'plugin:@dword-design/import-alias/recommended',
    'plugin:storybook/recommended',
  ],
  overrides: [
    {
      files: ['*.tsx'],
      processor: '@graphql-eslint/graphql',
    },
    {
      /*
       * Fix issues with shadcn components
       * See here: https://github.com/shadcn-ui/ui/issues/120#issuecomment-1828081539
       */
      files: ['**/components/ui/*.tsx'],
      rules: {
        'react/prop-types': [
          2,
          {
            ignore: ['checked', 'className', 'position', 'sideOffset', 'type'],
          },
        ],
        'react-refresh/only-export-components': 'off',
      },
    },
    {
      files: ['*.graphql'],
      extends: [
        'plugin:@graphql-eslint/operations-all',
        'plugin:@graphql-eslint/schema-all',
      ],
      parser: '@graphql-eslint/eslint-plugin',
      parserOptions: {
        operations: ['src/**/*.tsx'],
        schema: './src/gql/*.graphql',
      },
      rules: {
        '@graphql-eslint/executable-definitions': 'off',
        '@graphql-eslint/no-one-place-fragments': 'off',
        '@graphql-eslint/no-unused-fragments': 'off',
        '@graphql-eslint/require-description': 'off',
        '@graphql-eslint/require-nullable-result-in-root': 'off',
      },
    },
  ],
  rules: {
    '@dword-design/import-alias/prefer-alias': [
      'error',
      {
        alias: {
          '@': './src/',
        },
      },
    ],
  },
};

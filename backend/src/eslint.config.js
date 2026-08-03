const js = require('@eslint/js');
const globals = require('globals');
const eslintPluginImport = require('eslint-plugin-import');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  js.configs.recommended,

  {
    files: ['**/*.js'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      import: eslintPluginImport,
    },

    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'import/order': [
        'warn',
        {
          alphabetize: {
            order: 'asc',
          },
          'newlines-between': 'always',
        },
      ],
    },
  },

  eslintConfigPrettier,
];
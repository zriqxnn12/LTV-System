const tseslint = require('typescript-eslint');
const eslint = require('eslint-plugin-prettier');

module.exports[
  tseslint.config({
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'ES2022',
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
    extends: [eslint.configs.recommended, tseslint.configs.recommended],
    rules: {
      ...eslint.rules,
      ...tseslint.rules,
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
    include: ['*.ts', '**/*.ts'],
    exclude: ['dist', 'node_modules'],
  })
];

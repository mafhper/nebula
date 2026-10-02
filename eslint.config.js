import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // Os diretorios de agente (`.dev/` e afins) sao gitignored, entao o CI nunca
    // os ve — mas localmente entravam no lint e afogavam os erros reais do
    // projeto em dezenas de `no-undef`. Ignorar aqui alinha o lint local ao CI.
    ignores: [
      '**/dist/**',
      '**/coverage/**',
      '**/node_modules/**',
      '**/*.tsbuildinfo',
      '.dev/',
      '_dev/',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
  {
    // Scripts Node versionados (validadores, ferramentas de repo) rodam em
    // Node, nao no browser. Sem os globals de Node o `no-undef` acusa
    // `console` e `process` em arquivos que funcionam.
    files: ['**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2024,
      globals: {
        ...globals.node,
      },
    },
  },
);

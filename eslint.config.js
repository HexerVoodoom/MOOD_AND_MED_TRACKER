import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  {
    // Generated / vendored code and build output are not linted.
    ignores: [
      'dist/**',
      'twa-build/**',
      'twa-build-2/**',
      'src/imports/**',
      'src/components/ui/**',
      'src/supabase/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // The service worker runs in a ServiceWorkerGlobalScope.
    files: ['public/sw.js', '**/sw.js'],
    languageOptions: {
      globals: { ...globals.serviceworker, ...globals.browser },
    },
  },
  {
    // CommonJS config files (tailwind/postcss) run on Node and use require().
    files: ['*.config.{js,cjs}', 'postcss.config.js', 'tailwind.config.js'],
    languageOptions: {
      globals: { ...globals.node },
      sourceType: 'commonjs',
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    languageOptions: {
      globals: { ...globals.browser },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // The codebase leans on `any` for localStorage-backed state; keep it as a
      // hint rather than a hard failure for now.
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'react-hooks/exhaustive-deps': 'warn',
    },
  }
);

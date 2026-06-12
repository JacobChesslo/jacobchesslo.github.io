import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

const localRules = {
  rules: {
    'no-em-dash': {
      meta: {
        type: 'problem',
        fixable: 'code',
        docs: { description: 'Disallow em-dashes (\u2014); use a regular hyphen (-).' },
        schema: [],
        messages: { emDash: 'Em-dash (\u2014) is not allowed; use a regular hyphen (-).' },
      },
      create(context) {
        const sourceCode = context.sourceCode ?? context.getSourceCode();
        return {
          Program(node) {
            const text = sourceCode.getText();
            for (let i = text.indexOf('\u2014'); i !== -1; i = text.indexOf('\u2014', i + 1)) {
              context.report({
                node,
                loc: {
                  start: sourceCode.getLocFromIndex(i),
                  end: sourceCode.getLocFromIndex(i + 1),
                },
                messageId: 'emDash',
                fix: (fixer) => fixer.replaceTextRange([i, i + 1], '-'),
              });
            }
          },
        };
      },
    },
  },
};

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ['dist/', 'node_modules/', '.astro/', 'playwright-report/', 'test-results/'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        // optionally, if you also want browser globals here:
        // ...globals.browser,
      },
    },
    plugins: { local: localRules },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'local/no-em-dash': 'error',
    },
  },
  {
    files: ['**/*.astro'],
    plugins: { local: localRules },
    rules: {
      'local/no-em-dash': 'error',
    },
  },
];

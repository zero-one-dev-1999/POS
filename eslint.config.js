import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import typescriptEslint from '@typescript-eslint/eslint-plugin'

export default tseslint.config(
	{ ignores: ['dist', 'node_modules', 'public'] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
		files: ['**/*.{ts,tsx,js,jsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			prettier,
			typescriptEslint,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'prettier/prettier': [0, {}, { usePrettierrc: true }],
			'no-unused-vars': 'warn',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': 'warn',
			'no-restricted-imports': [
				'error',
				{
					patterns: ['@mui/*/*/*'],
				},
			],
			'@typescript-eslint/ban-ts-comment': 'off',
			'react-hooks/exhaustive-deps': 'off',
		},
	},
)

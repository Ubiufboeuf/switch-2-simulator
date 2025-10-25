import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import css from '@eslint/css'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  { files: ['**/*.md'], plugins: { markdown }, language: 'markdown/gfm', extends: ['markdown/recommended'] },
  { files: ['**/*.css'], plugins: { css }, language: 'css/css', extends: ['css/recommended'] },
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-empty-pattern': 'off',
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      '@stylistic/eol-last': ['error', 'always'],
      '@typescript-eslint/consistent-type-imports': 'error',
      'space-before-function-paren': ['error', 'always'],
      'react/no-unknown-property': ['error', { ignore: ['class'] }],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@typescript-eslint/no-unused-vars': ['warn']
    },
    settings: {
      'react': {
        'version': 'detect',
        'defaultVersion': ''
      }
    }
  }
])

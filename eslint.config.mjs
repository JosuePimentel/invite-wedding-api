import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';


export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], languageOptions: { globals: globals.node },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'semi': ['error', 'always'], 
      'indent': ['error', 2],
      'quotes': ['error', 'single'],  
      '@typescript-eslint/no-namespace': 'off'
    }
  },
  tseslint.configs.recommended,
  globalIgnores(['dist', 'node_modules', 'db/app.ts'])
]);

import globals, { commonjs } from "globals";
import { defineConfig } from "eslint/config";
import js from '@eslint/js'

export default defineConfig([
  js.configs.recommended,
  { files : ['**/**.js'], 
    ignores : ['dist', 'node_modules'],
    languageOptions : {
      globals : globals.node,
      sourceType: commonjs
    },
    rules: {
      'no-console': 'off'
    }
  }
]);

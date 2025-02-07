import globals from "globals"
import pluginJs from "@eslint/js"
import pluginJest from "eslint-plugin-jest" // <-- Add this line

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        process: "readonly",
      },
    },
  },
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      semi: ["error", "never"]
    }
  },
  {
    files: ['**/*.spec.js', '**/*.test.js'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/valid-expect': 'error',
    },
  }
]

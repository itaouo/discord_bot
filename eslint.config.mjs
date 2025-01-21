import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: 
    {
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
          "no-unused-vars": "warn"
      }
  }
];
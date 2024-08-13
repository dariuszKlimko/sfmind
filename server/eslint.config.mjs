import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import globals from "globals";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.es6,
      },
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        project: "tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double", { allowTemplateLiterals: true, avoidEscape: false }],
      "prefer-const": "error",
      "comma-dangle": ["warn", "only-multiline"],
      "no-restricted-imports": ["error", { patterns: ["./*", "../*"] }],
      "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
      "@typescript-eslint/no-explicit-any": 1,
      "@typescript-eslint/no-inferrable-types": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-interface": [
        "error",
        {
          "allowSingleExtends": true
        }
      ]
    },
    files: ["src/**/*.ts"],
    ignores: ["eslint.config.js","dist/*"],
  }
];
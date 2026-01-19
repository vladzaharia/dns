// @ts-check
/**
 * ESLint Configuration for dnscontrol-types Documentation
 *
 * Minimal configuration for documentation TypeScript files.
 */
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import { commonIgnores } from "@vladzaharia/dns-config/eslint";

export default tseslint.config(
  // Global ignores
  {
    ignores: [...commonIgnores, ".vitepress/cache/", ".vitepress/dist/", "api/"],
  },

  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript-ESLint recommended rules
  ...tseslint.configs.recommended,

  // Configuration files
  {
    files: [".vitepress/**/*.ts", ".vitepress/**/*.mts"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2020,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  }
);


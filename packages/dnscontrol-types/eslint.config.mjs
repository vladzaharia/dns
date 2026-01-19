// @ts-check
/**
 * ESLint Configuration for dnscontrol-types
 *
 * Extends the shared base configuration.
 */
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import {
  commonIgnores,
  sourceRules,
  testRules,
} from "@vladzaharia/dns-config/eslint";

export default tseslint.config(
  // Global ignores
  {
    ignores: [...commonIgnores, "types/"],
  },

  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript-ESLint recommended rules with type checking
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // Source files configuration
  {
    files: ["src/**/*.ts"],
    ignores: ["src/**/*.test.ts"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2020,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: sourceRules,
  },

  // Test files configuration
  {
    files: ["src/**/*.test.ts"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2020,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: testRules,
  }
);


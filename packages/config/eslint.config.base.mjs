// @ts-check
/**
 * Shared ESLint Configuration for DNS Infrastructure-as-Code Monorepo
 *
 * This module provides base ESLint configurations that can be extended
 * by individual packages in the monorepo.
 *
 * @module @vladzaharia/dns-config/eslint
 */
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

/**
 * Common ignore patterns for all packages
 */
export const commonIgnores = [
  "dist/",
  "out/",
  "node_modules/",
  "coverage/",
  "*.js",
  "*.cjs",
  "*.mjs",
  "*.d.ts",
];

/**
 * Common TypeScript rules for source files
 */
export const sourceRules = {
  // Allow unused variables that start with underscore
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
    },
  ],
  // Require explicit any to be intentional
  "@typescript-eslint/no-explicit-any": "error",
  // Prefer const assertions for literal types
  "@typescript-eslint/prefer-as-const": "error",
  // Type safety rules
  "@typescript-eslint/no-unsafe-member-access": "error",
  "@typescript-eslint/no-unsafe-call": "error",
  "@typescript-eslint/no-unsafe-assignment": "error",
  "@typescript-eslint/no-unsafe-return": "error",
  "@typescript-eslint/no-unsafe-argument": "error",
  // Require explicit return types on exported functions
  "@typescript-eslint/explicit-function-return-type": [
    "warn",
    {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
    },
  ],
};

/**
 * Relaxed rules for test files
 */
export const testRules = {
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/no-unsafe-member-access": "off",
  "@typescript-eslint/no-unsafe-call": "off",
  "@typescript-eslint/no-unsafe-assignment": "off",
  "@typescript-eslint/no-unsafe-return": "off",
  "@typescript-eslint/no-unsafe-argument": "off",
  "@typescript-eslint/no-non-null-assertion": "off",
};

/**
 * Creates a base ESLint configuration for TypeScript projects
 *
 * @param {Object} options - Configuration options
 * @param {string[]} [options.ignores] - Additional patterns to ignore
 * @param {Object} [options.globals] - Additional global variables
 * @returns {import('typescript-eslint').ConfigArray} ESLint configuration array
 */
export function createBaseConfig(options = {}) {
  const { ignores = [], globals: additionalGlobals = {} } = options;

  return tseslint.config(
    // Global ignores
    {
      ignores: [...commonIgnores, ...ignores],
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
          ...additionalGlobals,
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
      files: ["src/**/*.test.ts", "tests/**/*.ts"],
      languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        globals: {
          ...globals.node,
          ...globals.es2020,
          ...additionalGlobals,
        },
        parserOptions: {
          project: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
      rules: testRules,
    }
  );
}

// Re-export dependencies for convenience
export { eslint, tseslint, globals };

// Default export for simple usage
export default createBaseConfig();


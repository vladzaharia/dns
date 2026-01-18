// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      "dist/",
      "out/",
      "node_modules/",
      "lib/",
      "*.js",
      "*.cjs",
      "*.mjs",
      "coverage/",
      // Config files at root that aren't part of the TypeScript project
      "vitest.config.ts",
      "webpack.config.js",
      "stryker.config.json",
    ],
  },

  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript-ESLint recommended rules with type checking
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // Source files configuration
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2020,
        // DNSControl DSL globals
        D: "readonly",
        A: "readonly",
        AAAA: "readonly",
        CNAME: "readonly",
        MX: "readonly",
        TXT: "readonly",
        SRV: "readonly",
        CAA: "readonly",
        NS: "readonly",
        TTL: "readonly",
        NewRegistrar: "readonly",
        NewDnsProvider: "readonly",
        DnsProvider: "readonly",
        DefaultTTL: "readonly",
        IGNORE: "readonly",
        IGNORE_NAME: "readonly",
        CF_REDIRECT: "readonly",
        CF_TEMP_REDIRECT: "readonly",
        CF_PROXY_ON: "readonly",
        CF_PROXY_OFF: "readonly",
      },
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
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
      // Type safety rules - now enforced as errors
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
    },
  },

  // Test files configuration
  {
    files: ["tests/**/*.ts"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2020,
        // DNSControl DSL globals (for mocks)
        D: "readonly",
        A: "readonly",
        AAAA: "readonly",
        CNAME: "readonly",
        MX: "readonly",
        TXT: "readonly",
        SRV: "readonly",
        CAA: "readonly",
        NS: "readonly",
        TTL: "readonly",
        NewRegistrar: "readonly",
        NewDnsProvider: "readonly",
        DnsProvider: "readonly",
        DefaultTTL: "readonly",
        IGNORE: "readonly",
        IGNORE_NAME: "readonly",
        CF_REDIRECT: "readonly",
        CF_TEMP_REDIRECT: "readonly",
        CF_PROXY_ON: "readonly",
        CF_PROXY_OFF: "readonly",
      },
      parserOptions: {
        project: "./tsconfig.test.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Relax some rules for tests
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      // Allow non-null assertions in tests
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  }
);


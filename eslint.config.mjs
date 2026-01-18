// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  // Global ignores
  {
    ignores: ["dist/", "out/", "node_modules/", "lib/", "*.js", "*.cjs", "coverage/"],
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
      // Warn on explicit any (will be upgraded to error after type improvements)
      "@typescript-eslint/no-explicit-any": "warn",
      // Prefer const assertions for literal types
      "@typescript-eslint/prefer-as-const": "error",
      // These rules are temporarily set to warn - will be upgraded to error
      // after DNSControl type definitions are created
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
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
        project: "./tsconfig.json",
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


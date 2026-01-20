// @ts-check
/**
 * ESLint Configuration for Polaris DNS
 *
 * Extends the shared base configuration with DNSControl-specific globals.
 */
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import {
  commonIgnores,
  sourceRules,
  testRules,
} from "@vladzaharia/dns-config/eslint";

/**
 * DNSControl DSL global variables
 */
const dnscontrolGlobals = {
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
};

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      ...commonIgnores,
      "lib/",
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
        ...dnscontrolGlobals,
      },
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: sourceRules,
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
        ...dnscontrolGlobals,
      },
      parserOptions: {
        project: "./tsconfig.test.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: testRules,
  }
);


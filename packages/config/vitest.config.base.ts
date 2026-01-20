/**
 * Shared Vitest Configuration for DNS Infrastructure-as-Code Monorepo
 *
 * @module @vladzaharia/dns-config/vitest
 * @see https://vitest.dev/config/
 */
import { defineConfig, type UserConfig } from "vitest/config";

/**
 * Base Vitest configuration options
 */
export const baseVitestConfig: UserConfig["test"] = {
  // Use globals for describe, it, expect, etc.
  globals: true,

  // Environment for running tests
  environment: "node",

  // Include patterns for test files
  include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],

  // Exclude patterns
  exclude: ["**/node_modules/**", "**/dist/**", "**/out/**", "**/coverage/**"],

  // Coverage configuration
  coverage: {
    provider: "v8",
    reporter: ["text", "json", "html", "lcov"],
    exclude: [
      "node_modules/",
      "dist/",
      "out/",
      "coverage/",
      "**/*.d.ts",
      "**/*.test.ts",
      "**/*.spec.ts",
      "**/tests/**",
      "**/__mocks__/**",
      "**/vitest.config.*",
      "**/eslint.config.*",
    ],
    thresholds: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },

  // Reporter configuration
  reporters: ["default"],

  // Watch mode configuration
  watch: false,

  // Timeout for tests
  testTimeout: 10000,

  // Hook timeout
  hookTimeout: 10000,

  // Teardown timeout
  teardownTimeout: 10000,

  // Pool options
  pool: "threads",

  // Isolate tests
  isolate: true,
};

/**
 * Creates a Vitest configuration with optional overrides
 *
 * @param overrides - Configuration overrides to merge with base config
 * @returns Vitest configuration
 */
export function createVitestConfig(overrides: UserConfig["test"] = {}) {
  return defineConfig({
    test: {
      ...baseVitestConfig,
      ...overrides,
      coverage: {
        ...baseVitestConfig.coverage,
        ...overrides.coverage,
      },
    },
  });
}

// Default export for simple usage
export default createVitestConfig();


import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    // Global test settings
    globals: true,
    environment: "node",

    // Test file patterns
    include: ["tests/**/*.test.ts"],
    exclude: ["node_modules", "out", "dist"],

    // Setup files for global mocks and matchers
    setupFiles: ["./tests/setup.ts"],

    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      include: ["src/**/*.ts"],
      exclude: [
        "src/index.ts",
        "src/definitions/**",
        "src/**/*.d.ts",
        "**/*.test.ts",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
      reportsDirectory: "./coverage",
    },

    // TypeScript type checking
    typecheck: {
      enabled: true,
      tsconfig: "./tsconfig.json",
    },

    // Reporter configuration
    reporters: ["verbose"],

    // Test timeout
    testTimeout: 10000,

    // Pool configuration for parallel execution
    // Note: poolOptions was removed in Vitest 4, use top-level options instead
    pool: "threads",

    // Snapshot configuration
    snapshotFormat: {
      escapeString: false,
      printBasicPrototype: false,
    },
  },

  // Path aliases matching tsconfig
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@tests": path.resolve(__dirname, "./tests"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@mail": path.resolve(__dirname, "./src/mail"),
      "@zones": path.resolve(__dirname, "./src/zones"),
    },
  },
});


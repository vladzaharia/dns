module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  env: {
    node: true,
    es2020: true,
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
    // Allow explicit any in specific cases (DNSControl DSL compatibility)
    "@typescript-eslint/no-explicit-any": "warn",
    // Prefer const assertions for literal types
    "@typescript-eslint/prefer-as-const": "error",
    // Allow require imports for compatibility
    "@typescript-eslint/no-var-requires": "off",
    // Allow unsafe member access for DNSControl DSL
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
  },
  ignorePatterns: ["dist/", "out/", "node_modules/", "lib/", "*.js", "*.cjs", "*.mjs"],
};


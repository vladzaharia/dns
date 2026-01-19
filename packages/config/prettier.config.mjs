/**
 * Shared Prettier Configuration for DNS Infrastructure-as-Code Monorepo
 *
 * @module @vladzaharia/dns-config/prettier
 * @see https://prettier.io/docs/en/configuration.html
 */

/** @type {import("prettier").Config} */
const config = {
  // Use double quotes for strings
  singleQuote: false,

  // Add trailing commas where valid in ES5 (objects, arrays, etc.)
  trailingComma: "es5",

  // Use 2 spaces for indentation
  tabWidth: 2,

  // Use spaces instead of tabs
  useTabs: false,

  // Print semicolons at the ends of statements
  semi: true,

  // Print width - wrap lines at 100 characters
  printWidth: 100,

  // Use LF line endings
  endOfLine: "lf",

  // Bracket spacing in object literals
  bracketSpacing: true,

  // Put the > of a multi-line JSX element at the end of the last line
  bracketSameLine: false,

  // Include parentheses around a sole arrow function parameter
  arrowParens: "always",

  // Prose wrapping for markdown
  proseWrap: "preserve",

  // HTML whitespace sensitivity
  htmlWhitespaceSensitivity: "css",

  // Embedded language formatting
  embeddedLanguageFormatting: "auto",

  // Single attribute per line in HTML, Vue, and JSX
  singleAttributePerLine: false,
};

export default config;


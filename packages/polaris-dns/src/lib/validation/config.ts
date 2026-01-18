/**
 * Validation configuration for polaris-dns
 *
 * Provides configurable validation behavior with three modes:
 * - strict: Throw errors on validation failure (default)
 * - warn: Log warnings but continue execution
 * - disabled: Skip validation entirely
 */

/**
 * Validation mode determines how validation failures are handled
 */
export type ValidationMode = "strict" | "warn" | "disabled";

/**
 * Validation configuration options
 */
export interface ValidationConfig {
  /** How to handle validation failures */
  mode: ValidationMode;
  /** Whether to throw errors on validation failure (only applies in strict mode) */
  throwOnError: boolean;
  /** Whether to log warnings (applies in warn mode) */
  logWarnings: boolean;
  /** Custom logger function for warnings */
  logger?: (message: string, ...args: unknown[]) => void;
}

/**
 * Default validation configuration
 */
const DEFAULT_CONFIG: ValidationConfig = {
  mode: "strict",
  throwOnError: true,
  logWarnings: true,
  logger: console.warn,
};

/**
 * Current validation configuration (module-level state)
 */
let currentConfig: ValidationConfig = { ...DEFAULT_CONFIG };

/**
 * Get the current validation configuration
 */
export function getValidationConfig(): Readonly<ValidationConfig> {
  return { ...currentConfig };
}

/**
 * Set validation configuration
 * Merges provided options with current configuration
 */
export function setValidationConfig(config: Partial<ValidationConfig>): ValidationConfig {
  currentConfig = { ...currentConfig, ...config };
  return { ...currentConfig };
}

/**
 * Reset validation configuration to defaults
 */
export function resetValidationConfig(): ValidationConfig {
  currentConfig = { ...DEFAULT_CONFIG };
  return { ...currentConfig };
}

/**
 * Execute a function with a temporary validation mode
 * Restores the previous mode after execution
 *
 * @example
 * ```typescript
 * // Temporarily disable validation
 * const result = withValidationMode('disabled', () => {
 *   return createARecord('test', '192.168.1.1');
 * });
 * ```
 */
export function withValidationMode<T>(mode: ValidationMode, fn: () => T): T {
  const previousMode = currentConfig.mode;
  currentConfig.mode = mode;
  try {
    return fn();
  } finally {
    currentConfig.mode = previousMode;
  }
}

/**
 * Execute an async function with a temporary validation mode
 * Restores the previous mode after execution
 */
export async function withValidationModeAsync<T>(
  mode: ValidationMode,
  fn: () => Promise<T>
): Promise<T> {
  const previousMode = currentConfig.mode;
  currentConfig.mode = mode;
  try {
    return await fn();
  } finally {
    currentConfig.mode = previousMode;
  }
}

/**
 * Check if validation is currently enabled
 */
export function isValidationEnabled(): boolean {
  return currentConfig.mode !== "disabled";
}

/**
 * Check if validation should throw errors
 */
export function shouldThrowOnError(): boolean {
  return currentConfig.mode === "strict" && currentConfig.throwOnError;
}

/**
 * Check if validation should log warnings
 */
export function shouldLogWarnings(): boolean {
  return currentConfig.mode === "warn" && currentConfig.logWarnings;
}

/**
 * Log a validation warning using the configured logger
 */
export function logValidationWarning(message: string, ...args: unknown[]): void {
  if (shouldLogWarnings() && currentConfig.logger) {
    currentConfig.logger(`[Validation Warning] ${message}`, ...args);
  }
}

/**
 * Zod schemas for server validation
 * Validates server definitions and registry
 *
 * This module re-exports schemas from the validation module for use in tests.
 */

// Re-export from validation module
import {
  ServerLocationSchema,
  ServerNameSchema,
  ServerSchema,
  ServerRegistrySchema,
  type ServerLocation as ServerLocationType,
  type ServerName as ServerNameType,
  type Server as ServerType,
  type ServerRegistry as ServerRegistryType,
} from "../../src/lib/validation/index.js";

// Re-export with test-friendly names (lowercase for consistency with existing tests)
export const serverLocationSchema = ServerLocationSchema;
export const serverNameSchema = ServerNameSchema;
export const serverSchema = ServerSchema;
export const serverRegistrySchema = ServerRegistrySchema;

// Type exports
export type ServerLocation = ServerLocationType;
export type ServerName = ServerNameType;
export type Server = ServerType;
export type ServerRegistry = ServerRegistryType;

/**
 * Server validation functions for polaris-dns
 *
 * Provides validation for server definitions, locations, and names
 * with configuration-aware behavior.
 */

import type { ZodError } from "zod";
import * as dnscontrolTypes from "@vladzaharia/dnscontrol-types";

import {
  ServerSchema,
  ServerLocationSchema,
  ServerNameSchema,
  ServerRegistrySchema,
  type Server,
  type ServerLocation,
  type ServerName,
  type ServerRegistry,
} from "../schemas/server.schema.js";
import { getValidationConfig, logValidationWarning, shouldThrowOnError } from "../config.js";
import { ServerValidationError } from "../errors.js";

// Local type alias for FormattedError
type FormattedError = dnscontrolTypes.FormattedError;

/**
 * Server validation result
 */
export interface ServerValidationResult<T> {
  success: boolean;
  data?: T;
  errors: FormattedError[];
}

/**
 * Validate a server definition
 */
export function validateServer(data: unknown): ServerValidationResult<Server> {
  const config = getValidationConfig();

  // If validation is disabled, return success
  if (config.mode === "disabled") {
    return {
      success: true,
      data: data as Server,
      errors: [],
    };
  }

  const result = ServerSchema.safeParse(data) as
    | { success: true; data: Server }
    | { success: false; error: ZodError };

  if (result.success) {
    return {
      success: true,
      data: result.data,
      errors: [],
    };
  }

  const formattedErrors: FormattedError[] = dnscontrolTypes.formatErrors(result.error);
  const serverName = (data as { name?: string })?.name;

  // In warn mode, log and return success
  if (config.mode === "warn") {
    logValidationWarning(`Server validation failed for ${serverName}:`, formattedErrors);
    return {
      success: true,
      data: data as Server,
      errors: formattedErrors,
    };
  }

  // In strict mode, throw or return failure
  if (shouldThrowOnError()) {
    throw new ServerValidationError(
      `Server validation failed for ${serverName}`,
      formattedErrors,
      serverName
    );
  }

  return {
    success: false,
    errors: formattedErrors,
  };
}

/**
 * Validate a server location
 */
export function validateServerLocation(data: unknown): ServerValidationResult<ServerLocation> {
  const config = getValidationConfig();

  if (config.mode === "disabled") {
    return { success: true, data: data as ServerLocation, errors: [] };
  }

  const result = ServerLocationSchema.safeParse(data) as
    | { success: true; data: ServerLocation }
    | { success: false; error: ZodError };

  if (result.success) {
    return { success: true, data: result.data, errors: [] };
  }

  const formattedErrors: FormattedError[] = dnscontrolTypes.formatErrors(result.error);

  if (config.mode === "warn") {
    logValidationWarning("Server location validation failed:", formattedErrors);
    return { success: true, data: data as ServerLocation, errors: formattedErrors };
  }

  if (shouldThrowOnError()) {
    throw new ServerValidationError("Invalid server location", formattedErrors);
  }

  return { success: false, errors: formattedErrors };
}

/**
 * Validate a server name
 */
export function validateServerName(data: unknown): ServerValidationResult<ServerName> {
  const config = getValidationConfig();

  if (config.mode === "disabled") {
    return { success: true, data: data as ServerName, errors: [] };
  }

  const result = ServerNameSchema.safeParse(data) as
    | { success: true; data: ServerName }
    | { success: false; error: ZodError };

  if (result.success) {
    return { success: true, data: result.data, errors: [] };
  }

  const formattedErrors: FormattedError[] = dnscontrolTypes.formatErrors(result.error);

  if (config.mode === "warn") {
    logValidationWarning("Server name validation failed:", formattedErrors);
    return { success: true, data: data as ServerName, errors: formattedErrors };
  }

  if (shouldThrowOnError()) {
    throw new ServerValidationError("Invalid server name", formattedErrors);
  }

  return { success: false, errors: formattedErrors };
}

/**
 * Validate a server registry
 */
export function validateServerRegistry(data: unknown): ServerValidationResult<ServerRegistry> {
  const config = getValidationConfig();

  if (config.mode === "disabled") {
    return { success: true, data: data as ServerRegistry, errors: [] };
  }

  const result = ServerRegistrySchema.safeParse(data) as
    | { success: true; data: ServerRegistry }
    | { success: false; error: ZodError };

  if (result.success) {
    return { success: true, data: result.data, errors: [] };
  }

  const formattedErrors: FormattedError[] = dnscontrolTypes.formatErrors(result.error);

  if (config.mode === "warn") {
    logValidationWarning("Server registry validation failed:", formattedErrors);
    return { success: true, data: data as ServerRegistry, errors: formattedErrors };
  }

  if (shouldThrowOnError()) {
    throw new ServerValidationError("Invalid server registry", formattedErrors);
  }

  return { success: false, errors: formattedErrors };
}

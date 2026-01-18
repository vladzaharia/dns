/**
 * Service validation functions for polaris-dns
 *
 * Provides validation for service definitions, routing strategies,
 * and domain configurations with configuration-aware behavior.
 */

import { formatErrors } from "@vladzaharia/dnscontrol-types";
import type { FormattedError } from "@vladzaharia/dnscontrol-types";

import {
  ServiceSchema,
  ServiceDefinitionSchema,
  RoutingStrategySchema,
  ServiceCategorySchema,
  DomainCategorySchema,
  PolarisDomainConfigSchema,
  MailConfigSchema,
  type Service,
  type ServiceDefinition,
  type RoutingStrategy,
  type ServiceCategory,
  type DomainCategory,
  type PolarisDomainConfig,
  type MailConfig,
} from "../schemas/service.schema.js";
import { getValidationConfig, logValidationWarning, shouldThrowOnError } from "../config.js";
import { ServiceValidationError, ConfigValidationError } from "../errors.js";

/**
 * Service validation result
 */
export interface ServiceValidationResult<T> {
  success: boolean;
  data?: T;
  errors: FormattedError[];
}

/**
 * Validate a service definition
 */
export function validateService(data: unknown): ServiceValidationResult<Service> {
  const config = getValidationConfig();

  if (config.mode === "disabled") {
    return { success: true, data: data as Service, errors: [] };
  }

  const result = ServiceSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data, errors: [] };
  }

  const formattedErrors = formatErrors(result.error);
  const serviceName = (data as { name?: string })?.name;

  if (config.mode === "warn") {
    logValidationWarning(`Service validation failed for ${serviceName}:`, formattedErrors);
    return { success: true, data: data as Service, errors: formattedErrors };
  }

  if (shouldThrowOnError()) {
    throw new ServiceValidationError(
      `Service validation failed for ${serviceName}`,
      formattedErrors,
      serviceName
    );
  }

  return { success: false, errors: formattedErrors };
}

/**
 * Validate a service definition (flexible subdomain)
 */
export function validateServiceDefinition(
  data: unknown
): ServiceValidationResult<ServiceDefinition> {
  const config = getValidationConfig();

  if (config.mode === "disabled") {
    return { success: true, data: data as ServiceDefinition, errors: [] };
  }

  const result = ServiceDefinitionSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data, errors: [] };
  }

  const formattedErrors = formatErrors(result.error);
  const serviceName = (data as { name?: string })?.name;

  if (config.mode === "warn") {
    logValidationWarning(`Service definition validation failed:`, formattedErrors);
    return { success: true, data: data as ServiceDefinition, errors: formattedErrors };
  }

  if (shouldThrowOnError()) {
    throw new ServiceValidationError(
      `Service definition validation failed`,
      formattedErrors,
      serviceName
    );
  }

  return { success: false, errors: formattedErrors };
}

/**
 * Validate a routing strategy
 */
export function validateRoutingStrategy(data: unknown): ServiceValidationResult<RoutingStrategy> {
  const config = getValidationConfig();

  if (config.mode === "disabled") {
    return { success: true, data: data as RoutingStrategy, errors: [] };
  }

  const result = RoutingStrategySchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data, errors: [] };
  }

  const formattedErrors = formatErrors(result.error);

  if (config.mode === "warn") {
    logValidationWarning("Routing strategy validation failed:", formattedErrors);
    return { success: true, data: data as RoutingStrategy, errors: formattedErrors };
  }

  if (shouldThrowOnError()) {
    throw new ServiceValidationError("Invalid routing strategy", formattedErrors);
  }

  return { success: false, errors: formattedErrors };
}

/**
 * Validate a domain configuration
 */
export function validatePolarisDomainConfig(
  data: unknown
): ServiceValidationResult<PolarisDomainConfig> {
  const config = getValidationConfig();

  if (config.mode === "disabled") {
    return { success: true, data: data as PolarisDomainConfig, errors: [] };
  }

  const result = PolarisDomainConfigSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data, errors: [] };
  }

  const formattedErrors = formatErrors(result.error);

  if (config.mode === "warn") {
    logValidationWarning("Domain config validation failed:", formattedErrors);
    return { success: true, data: data as PolarisDomainConfig, errors: formattedErrors };
  }

  if (shouldThrowOnError()) {
    throw new ConfigValidationError("Invalid domain configuration", formattedErrors);
  }

  return { success: false, errors: formattedErrors };
}

/**
 * Validate a mail configuration
 */
export function validateMailConfig(data: unknown): ServiceValidationResult<MailConfig> {
  const config = getValidationConfig();

  if (config.mode === "disabled") {
    return { success: true, data: data as MailConfig, errors: [] };
  }

  const result = MailConfigSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data, errors: [] };
  }

  const formattedErrors = formatErrors(result.error);

  if (config.mode === "warn") {
    logValidationWarning("Mail config validation failed:", formattedErrors);
    return { success: true, data: data as MailConfig, errors: formattedErrors };
  }

  if (shouldThrowOnError()) {
    throw new ConfigValidationError("Invalid mail configuration", formattedErrors);
  }

  return { success: false, errors: formattedErrors };
}

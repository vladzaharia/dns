/**
 * Zod schemas for service validation
 * Validates service definitions and categories
 *
 * This module re-exports schemas from the validation module for use in tests.
 */

// Re-export from validation module
import {
  RoutingStrategySchema,
  ServiceCategorySchema,
  DomainCategorySchema,
  ServiceSchema,
  ServiceDefinitionSchema,
  PolarisDomainConfigSchema,
  MailProviderSchema,
  FastmailConfigSchema,
  PostalConfigSchema,
  RecordOptionsSchema,
  type RoutingStrategy as RoutingStrategyType,
  type ServiceCategory as ServiceCategoryType,
  type DomainCategory as DomainCategoryType,
  type Service as ServiceType,
  type ServiceDefinition as ServiceDefinitionType,
  type PolarisDomainConfig,
  type MailProvider as MailProviderType,
  type FastmailConfig as FastmailConfigType,
  type PostalConfig as PostalConfigType,
  type RecordOptions as RecordOptionsType,
} from "../../src/lib/validation/index.js";

// Re-export with test-friendly names (lowercase for consistency with existing tests)
export const routingStrategySchema = RoutingStrategySchema;
export const serviceCategorySchema = ServiceCategorySchema;
export const domainCategorySchema = DomainCategorySchema;
export const serviceSchema = ServiceSchema;
export const serviceDefinitionSchema = ServiceDefinitionSchema;
export const domainConfigSchema = PolarisDomainConfigSchema;
export const mailProviderSchema = MailProviderSchema;
export const fastmailConfigSchema = FastmailConfigSchema;
export const postalConfigSchema = PostalConfigSchema;
export const recordOptionsSchema = RecordOptionsSchema;

// Type exports
export type RoutingStrategy = RoutingStrategyType;
export type ServiceCategory = ServiceCategoryType;
export type DomainCategory = DomainCategoryType;
export type Service = ServiceType;
export type ServiceDefinition = ServiceDefinitionType;
export type DomainConfig = PolarisDomainConfig;
export type MailProvider = MailProviderType;
export type FastmailConfig = FastmailConfigType;
export type PostalConfig = PostalConfigType;
export type RecordOptions = RecordOptionsType;

/**
 * Domain Configuration Zod Schemas
 *
 * These schemas validate domain configurations for DNSControl.
 *
 * @packageDocumentation
 */

import { z } from 'zod';
import { TtlSchema, RecordMetaSchema } from './base.js';
import { DomainNameSchema } from './dns.js';

// =============================================================================
// DOMAIN CONFIGURATION
// =============================================================================

/**
 * DNS Provider reference schema
 */
export const DnsProviderRefSchema = z.object({
  /** Provider name/identifier */
  name: z.string(),
  /** Number of NS records to use (optional) */
  nsCount: z.number().int().positive().optional(),
});
export type DnsProviderRef = z.infer<typeof DnsProviderRefSchema>;

/**
 * Registrar reference schema
 */
export const RegistrarRefSchema = z.object({
  /** Registrar name/identifier */
  name: z.string(),
});
export type RegistrarRef = z.infer<typeof RegistrarRefSchema>;

/**
 * Domain configuration schema
 * Represents the configuration passed to D() function
 */
export const DomainConfigSchema = z.object({
  /** Domain name (e.g., "example.com") */
  name: DomainNameSchema,
  /** Registrar reference */
  registrar: z.union([z.string(), RegistrarRefSchema]),
  /** DNS providers */
  dnsProviders: z.array(z.union([z.string(), DnsProviderRefSchema])).optional(),
  /** Default TTL for records */
  defaultTTL: TtlSchema.optional(),
  /** Domain metadata */
  meta: RecordMetaSchema.optional(),
  /** Whether to disable automatic NS record management */
  noAutoDns: z.boolean().optional(),
  /** Whether to disable purging of unmanaged records */
  noPurge: z.boolean().optional(),
});
export type DomainConfig = z.infer<typeof DomainConfigSchema>;

// =============================================================================
// PROVIDER CONFIGURATION
// =============================================================================

/**
 * DNS Provider configuration schema
 * Represents the configuration passed to NewDnsProvider()
 */
export const DnsProviderConfigSchema = z.object({
  /** Provider type (e.g., "CLOUDFLAREAPI", "ROUTE53") */
  type: z.string(),
  /** Provider name/alias */
  name: z.string().optional(),
  /** Provider-specific configuration */
  meta: RecordMetaSchema.optional(),
});
export type DnsProviderConfig = z.infer<typeof DnsProviderConfigSchema>;

/**
 * Registrar configuration schema
 * Represents the configuration passed to NewRegistrar()
 */
export const RegistrarConfigSchema = z.object({
  /** Registrar type (e.g., "NONE", "CLOUDFLAREAPI") */
  type: z.string(),
  /** Registrar name/alias */
  name: z.string().optional(),
  /** Registrar-specific configuration */
  meta: RecordMetaSchema.optional(),
});
export type RegistrarConfig = z.infer<typeof RegistrarConfigSchema>;

// =============================================================================
// DEFAULTS CONFIGURATION
// =============================================================================

/**
 * DEFAULTS configuration schema
 * Represents the configuration passed to DEFAULTS()
 */
export const DefaultsConfigSchema = z.object({
  /** Default TTL for all records */
  ttl: TtlSchema.optional(),
  /** Default metadata for all records */
  meta: RecordMetaSchema.optional(),
});
export type DefaultsConfig = z.infer<typeof DefaultsConfigSchema>;

// =============================================================================
// FULL DNSCONTROL CONFIGURATION
// =============================================================================

/**
 * Complete DNSControl configuration schema
 * Represents a full dnsconfig.js configuration
 */
export const DnsControlConfigSchema = z.object({
  /** Registrar definitions */
  registrars: z.record(z.string(), RegistrarConfigSchema).optional(),
  /** DNS provider definitions */
  dnsProviders: z.record(z.string(), DnsProviderConfigSchema).optional(),
  /** Domain configurations */
  domains: z.array(DomainConfigSchema).optional(),
  /** Global defaults */
  defaults: DefaultsConfigSchema.optional(),
});
export type DnsControlConfig = z.infer<typeof DnsControlConfigSchema>;


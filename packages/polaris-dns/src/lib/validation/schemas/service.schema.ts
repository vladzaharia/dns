/**
 * Service validation schemas for polaris-dns
 *
 * Defines schemas for routing strategies, service definitions,
 * domain configurations, and mail provider settings.
 */

import { z } from "zod";
import { DomainNameSchema, DnsLabelSchema } from "@vladzaharia/dnscontrol-types";
import { ServerNameSchema } from "./server.schema.js";

// =============================================================================
// ROUTING STRATEGY
// =============================================================================

/**
 * Routing strategy for services
 * - direct: Direct connection to server IP
 * - tunnel: Route through VPN/tunnel
 * - proxied: Route through Cloudflare proxy
 */
export const RoutingStrategySchema = z.enum(["direct", "tunnel", "proxied"]);
export type RoutingStrategy = z.infer<typeof RoutingStrategySchema>;

// =============================================================================
// SERVICE CATEGORY
// =============================================================================

/**
 * Service category for organization
 */
export const ServiceCategorySchema = z.enum([
  "infrastructure",
  "productivity",
  "media",
  "gaming",
  "homelab",
  "internal",
]);
export type ServiceCategory = z.infer<typeof ServiceCategorySchema>;

// =============================================================================
// DOMAIN CATEGORY
// =============================================================================

/**
 * Domain category for organization
 */
export const DomainCategorySchema = z.enum(["personal", "infrastructure", "services", "local"]);
export type DomainCategory = z.infer<typeof DomainCategorySchema>;

// =============================================================================
// SERVICE DEFINITION
// =============================================================================

/**
 * Service definition schema
 * Defines a service that maps to DNS records
 */
export const ServiceSchema = z.object({
  /** Human-readable service name */
  name: z.string().min(1).max(100),
  /** Subdomain for the service */
  subdomain: DnsLabelSchema,
  /** Server hosting the service */
  server: ServerNameSchema,
  /** How traffic is routed */
  routing: RoutingStrategySchema,
  /** Whether this is an internal-only service */
  internal: z.boolean().optional(),
  /** Custom suffix for internal services (e.g., ".local", ".int") */
  internalSuffix: z.string().optional(),
});
export type Service = z.infer<typeof ServiceSchema>;

/**
 * Service definition with flexible subdomain (for complex names)
 */
export const ServiceDefinitionSchema = z.object({
  name: z.string().min(1),
  subdomain: z.string().min(1),
  server: ServerNameSchema,
  routing: RoutingStrategySchema,
  internal: z.boolean().optional(),
  internalSuffix: z.string().optional(),
});
export type ServiceDefinition = z.infer<typeof ServiceDefinitionSchema>;

// =============================================================================
// DOMAIN CONFIGURATION
// =============================================================================

/**
 * Domain configuration schema
 */
export const PolarisDomainConfigSchema = z.object({
  /** Domain name (e.g., "example.com") */
  name: z.string().min(1).max(253),
  /** Domain category */
  category: DomainCategorySchema,
  /** Registrar identifier */
  registrar: z.string().min(1),
  /** DNS provider identifier */
  dnsProvider: z.string().min(1),
});
export type PolarisDomainConfig = z.infer<typeof PolarisDomainConfigSchema>;

// =============================================================================
// MAIL PROVIDER CONFIGURATION
// =============================================================================

/**
 * Mail provider type
 */
export const MailProviderSchema = z.enum(["fastmail", "postal", "none"]);
export type MailProvider = z.infer<typeof MailProviderSchema>;

/**
 * Fastmail configuration
 */
export const FastmailConfigSchema = z.object({
  provider: z.literal("fastmail"),
  domain: z.string().min(1),
  includeSubdomainMail: z.boolean().optional(),
});
export type FastmailConfig = z.infer<typeof FastmailConfigSchema>;

/**
 * Postal (self-hosted mail) configuration
 */
export const PostalConfigSchema = z.object({
  provider: z.literal("postal"),
  domain: z.string().min(1),
  postalHostname: z.string().min(1),
  returnPath: z.string().min(1),
  dkimKey: z.string().min(1),
});
export type PostalConfig = z.infer<typeof PostalConfigSchema>;

/**
 * Union of mail configurations
 */
export const MailConfigSchema = z.discriminatedUnion("provider", [
  FastmailConfigSchema,
  PostalConfigSchema,
]);
export type MailConfig = z.infer<typeof MailConfigSchema>;

/**
 * Server validation schemas for polaris-dns
 *
 * Defines schemas for server locations, names, and definitions.
 * Uses primitives from @vladzaharia/dnscontrol-types for IP/hostname validation.
 */

import { z } from "zod";
import {
  Ipv4AddressSchema,
  Ipv6AddressSchema,
  HostnameSchema,
} from "@vladzaharia/dnscontrol-types";

// =============================================================================
// SERVER LOCATION
// =============================================================================

/**
 * Geographic location identifiers for servers
 * - sea: Seattle area
 * - qnc: Quincy (Azure datacenter)
 * - re: Remote/Edge
 * - local: Local development
 */
export const ServerLocationSchema = z.enum(["sea", "qnc", "re", "local"]);
export type ServerLocation = z.infer<typeof ServerLocationSchema>;

// =============================================================================
// SERVER NAME
// =============================================================================

/**
 * Valid server name identifiers
 * These correspond to actual server instances in the infrastructure
 */
export const ServerNameSchema = z.enum([
  "greenwood",
  "caphill",
  "pangolin",
  "upvpn",
  "reprise1",
  "reprise2",
  "reprise3",
  "reprise4",
  "local-traefik",
]);
export type ServerName = z.infer<typeof ServerNameSchema>;

// =============================================================================
// SERVER DEFINITION
// =============================================================================

/**
 * Server prefix validation
 * Short identifier used in DNS records (e.g., "gw" for greenwood)
 */
export const ServerPrefixSchema = z.string().min(1).max(10);
export type ServerPrefix = z.infer<typeof ServerPrefixSchema>;

/**
 * Complete server definition schema
 * Validates all properties of a server configuration
 */
export const ServerSchema = z.object({
  /** Server identifier */
  name: ServerNameSchema,
  /** Geographic location */
  location: ServerLocationSchema,
  /** Short prefix for DNS records */
  prefix: ServerPrefixSchema,
  /** Fully qualified hostname */
  hostname: HostnameSchema,
  /** Primary IPv4 address */
  ip: Ipv4AddressSchema,
  /** Optional IPv6 address */
  ipv6: Ipv6AddressSchema.optional(),
  /** Whether this server uses dynamic DNS */
  isDDNS: z.boolean().optional(),
});
export type Server = z.infer<typeof ServerSchema>;

/**
 * Server registry schema
 * Maps server names to their definitions
 */
export const ServerRegistrySchema = z.record(ServerNameSchema, ServerSchema);
export type ServerRegistry = z.infer<typeof ServerRegistrySchema>;

// =============================================================================
// PARTIAL SCHEMAS FOR UPDATES
// =============================================================================

/**
 * Partial server schema for updates
 * All fields are optional except name
 */
export const PartialServerSchema = ServerSchema.partial().required({
  name: true,
});
export type PartialServer = z.infer<typeof PartialServerSchema>;

/**
 * Server creation input schema
 * Requires all mandatory fields
 */
export const CreateServerInputSchema = ServerSchema.omit({ isDDNS: true }).extend({
  isDDNS: z.boolean().optional().default(false),
});
export type CreateServerInput = z.infer<typeof CreateServerInputSchema>;

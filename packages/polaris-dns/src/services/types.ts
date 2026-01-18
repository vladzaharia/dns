/**
 * Service type definitions
 */

import type { ServerName } from "../lib/types.js";

// =============================================================================
// Service Definition Types
// =============================================================================

/** Routing strategy for services */
export type RoutingStrategy = "direct" | "tunnel" | "proxied" | "internal";

/** Service definition */
export interface ServiceDefinition {
  /** Subdomain name (e.g., "auth" for auth.domain.com) */
  readonly subdomain: string;
  /** Human-readable description */
  readonly description: string;
  /** Target server (default: greenwood) */
  readonly server?: ServerName;
  /** Routing strategy (default: direct with proxy) */
  readonly routing?: RoutingStrategy;
  /** Custom IP address (overrides server) */
  readonly ip?: string;
  /** Custom CNAME target (overrides server) */
  readonly cname?: string;
  /** Whether to enable Cloudflare proxy (default: true for direct/tunnel) */
  readonly proxy?: boolean;
}

/** Service category definition */
export interface ServiceCategory {
  /** Category name */
  readonly name: string;
  /** Category description */
  readonly description: string;
  /** Services in this category */
  readonly services: readonly ServiceDefinition[];
}

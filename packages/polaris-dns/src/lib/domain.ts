/**
 * Domain builder and utilities
 */

import type { DomainCategory, DomainConfig } from "./types.js";

// =============================================================================
// DNSControl DSL Declarations
// =============================================================================

declare function D(
  domain: string,
  registrar: string,
  dnsProvider: unknown,
  ...records: unknown[]
): void;
declare function NewRegistrar(name: string): unknown;
declare function NewDnsProvider(name: string, type?: string): unknown;
declare function DnsProvider(provider: unknown): unknown;
declare function DefaultTTL(ttl: number): unknown;
declare function IGNORE(pattern: string): unknown;

// =============================================================================
// Provider Instances
// =============================================================================

/** No registrar (DNS-only management) */
export const NO_REGISTRAR = NewRegistrar("none");

/** Cloudflare DNS provider */
export const CLOUDFLARE = NewDnsProvider("cloudflare");

// =============================================================================
// Domain Builder
// =============================================================================

export interface DomainBuilderOptions {
  /** Domain name (e.g., "example.com") */
  name: string;
  /** Domain category */
  category: DomainCategory;
  /** Registrar to use (default: NO_REGISTRAR) */
  registrar?: unknown;
  /** DNS provider to use (default: CLOUDFLARE) */
  dnsProvider?: unknown;
  /** Patterns to ignore (externally managed records) */
  ignorePatterns?: string[];
  /** Default TTL for records (default: 1 = automatic) */
  defaultTTL?: number;
}

/**
 * Create a domain with the given configuration and records
 */
export function createDomain(options: DomainBuilderOptions, ...records: unknown[]): void {
  const {
    name,
    registrar = NO_REGISTRAR,
    dnsProvider = CLOUDFLARE,
    ignorePatterns = [],
    defaultTTL = 1,
  } = options;

  // Add ignore patterns as records
  const ignoreRecords = ignorePatterns.map((pattern) => IGNORE(pattern));

  D(
    name,
    registrar as string,
    DnsProvider(dnsProvider),
    DefaultTTL(defaultTTL),
    ...ignoreRecords,
    ...records
  );
}

/**
 * Create a domain configuration object
 */
export function defineDomain(
  name: string,
  category: DomainCategory,
  registrar = "none",
  dnsProvider = "cloudflare"
): DomainConfig {
  return {
    name,
    category,
    registrar,
    dnsProvider,
  };
}

// =============================================================================
// Domain Categories
// =============================================================================

/** Personal domains */
export const PERSONAL_DOMAINS = [
  "vlad.gg",
  "vlad.lgbt",
  "jesse.rocks",
  "spunk.dog",
  "famjam.ing",
  "zaharia.email",
] as const;

/** Infrastructure domains */
export const INFRASTRUCTURE_DOMAINS = ["plrs.im", "polaris.gdn", "zhr.one"] as const;

/** Service domains */
export const SERVICE_DOMAINS = ["polaris.express", "polaris.video", "polaris.rest"] as const;

/** Local/emergency router domains */
export const LOCAL_DOMAINS = ["danger.direct", "danger.diy"] as const;

/** All domains */
export const ALL_DOMAINS = [
  ...PERSONAL_DOMAINS,
  ...INFRASTRUCTURE_DOMAINS,
  ...SERVICE_DOMAINS,
  ...LOCAL_DOMAINS,
] as const;

export type PersonalDomain = (typeof PERSONAL_DOMAINS)[number];
export type InfrastructureDomain = (typeof INFRASTRUCTURE_DOMAINS)[number];
export type ServiceDomain = (typeof SERVICE_DOMAINS)[number];
export type LocalDomain = (typeof LOCAL_DOMAINS)[number];
export type Domain = (typeof ALL_DOMAINS)[number];

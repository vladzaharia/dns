/**
 * Domain Builder Module
 *
 * Provides utilities for creating and managing DNS domains in Polaris DNS.
 * This module wraps DNSControl's D() function with a type-safe, ergonomic API.
 *
 * @example
 * ```typescript
 * import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "./lib/domain.js";
 * import { createARecord, createCNAMERecord } from "./lib/record.js";
 *
 * createDomain(
 *   {
 *     name: "example.com",
 *     category: "personal",
 *     registrar: NO_REGISTRAR,
 *     dnsProvider: CLOUDFLARE,
 *   },
 *   createARecord("@", "192.0.2.1"),
 *   createCNAMERecord("www", "@")
 * );
 * ```
 *
 * @module lib/domain
 * @packageDocumentation
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
declare function NewDnsProvider(
  name: string,
  type?: string,
  metadata?: Record<string, unknown>
): unknown;
declare function DnsProvider(provider: unknown): unknown;
declare function DefaultTTL(ttl: number): unknown;
declare function IGNORE(pattern: string): unknown;

// =============================================================================
// Provider Instances
// =============================================================================

/** No registrar (DNS-only management) */
export const NO_REGISTRAR = NewRegistrar("none");

/** Cloudflare DNS provider (without redirect management) */
export const CLOUDFLARE = NewDnsProvider("cloudflare", undefined, {
  manage_redirects: false,
  manage_single_redirects: false,
});

/** Cloudflare DNS provider with redirect management enabled */
export const CLOUDFLARE_WITH_REDIRECTS = NewDnsProvider("cloudflare", undefined, {
  manage_redirects: true,
  manage_single_redirects: true,
});

// =============================================================================
// Domain Builder
// =============================================================================

/**
 * Configuration options for creating a domain.
 *
 * @example
 * ```typescript
 * const options: DomainBuilderOptions = {
 *   name: "example.com",
 *   category: "personal",
 *   registrar: NO_REGISTRAR,
 *   dnsProvider: CLOUDFLARE,
 *   ignorePatterns: ["_acme-challenge"],
 *   defaultTTL: 300,
 * };
 * ```
 */
export interface DomainBuilderOptions {
  /**
   * The fully qualified domain name (e.g., "example.com").
   * This should not include a trailing dot.
   */
  name: string;

  /**
   * Category for organizing domains.
   * Used for grouping and filtering in the documentation and logs.
   */
  category: DomainCategory;

  /**
   * Registrar provider instance.
   * Use `NO_REGISTRAR` for DNS-only management (most common).
   * @default NO_REGISTRAR
   */
  registrar?: unknown;

  /**
   * DNS provider instance.
   * Use `CLOUDFLARE` for Cloudflare DNS.
   * @default CLOUDFLARE
   */
  dnsProvider?: unknown;

  /**
   * Patterns for records to ignore during sync.
   * Useful for records managed outside of Polaris DNS (e.g., ACME challenges).
   * @example ["_acme-challenge", "*.dkim"]
   */
  ignorePatterns?: string[];

  /**
   * Default TTL for all records in this domain.
   * Set to 1 for automatic TTL (Cloudflare).
   * @default 1
   */
  defaultTTL?: number;
}

/**
 * Creates a DNS domain with the specified configuration and records.
 *
 * This is the primary function for defining domains in Polaris DNS.
 * It wraps DNSControl's `D()` function with sensible defaults and
 * automatic handling of ignore patterns.
 *
 * @param options - Domain configuration options
 * @param records - DNS records to add to the domain (created with record builders)
 *
 * @example
 * ```typescript
 * // Basic domain with A and CNAME records
 * createDomain(
 *   { name: "example.com", category: "personal" },
 *   createARecord("@", "192.0.2.1"),
 *   createCNAMERecord("www", "@")
 * );
 *
 * // Domain with custom TTL and ignore patterns
 * createDomain(
 *   {
 *     name: "example.com",
 *     category: "infrastructure",
 *     defaultTTL: 300,
 *     ignorePatterns: ["_acme-challenge"],
 *   },
 *   createARecord("@", "192.0.2.1"),
 *   ...createFastmailRecords()
 * );
 * ```
 *
 * @see {@link DomainBuilderOptions} for configuration options
 * @see {@link createARecord}, {@link createCNAMERecord} for record builders
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

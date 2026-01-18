/**
 * DNSControl Cloudflare Provider Types
 * Cloudflare-specific functions and modifiers
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />

// =============================================================================
// CLOUDFLARE PROXY
// =============================================================================

/**
 * CF_PROXY_ON() enables Cloudflare proxy (orange cloud) for a record.
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_proxy_on
 */
declare function CF_PROXY_ON(): RecordModifier;

/**
 * CF_PROXY_OFF() disables Cloudflare proxy (grey cloud) for a record.
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_proxy_off
 */
declare function CF_PROXY_OFF(): RecordModifier;

/**
 * CF_PROXY_DEFAULT() uses default proxy setting for a record.
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_proxy_default
 */
declare function CF_PROXY_DEFAULT(): RecordModifier;

// =============================================================================
// CLOUDFLARE REDIRECTS
// =============================================================================

/**
 * CF_REDIRECT() creates a 301 permanent redirect using Cloudflare Page Rules.
 * @param source - Source URL pattern (with wildcards)
 * @param destination - Destination URL (can use $1, $2 for captures)
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_redirect
 */
declare function CF_REDIRECT(source: string, destination: string): DomainModifier;

/**
 * CF_TEMP_REDIRECT() creates a 302 temporary redirect using Cloudflare Page Rules.
 * @param source - Source URL pattern (with wildcards)
 * @param destination - Destination URL (can use $1, $2 for captures)
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_temp_redirect
 */
declare function CF_TEMP_REDIRECT(source: string, destination: string): DomainModifier;

// =============================================================================
// CLOUDFLARE SINGLE REDIRECTS (Bulk Redirects)
// =============================================================================

/** CF_SINGLE_REDIRECT options */
interface CfSingleRedirectOptions {
  /** HTTP status code (301 or 302, default: 301) */
  code?: 301 | 302;
  /** Preserve query string (default: false) */
  preserveQueryString?: boolean;
  /** Include subdomains (default: false) */
  subdomainMatching?: boolean;
  /** Preserve path suffix (default: false) */
  preservePathSuffix?: boolean;
}

/**
 * CF_SINGLE_REDIRECT() creates a redirect using Cloudflare Bulk Redirects.
 * More efficient than Page Rules for simple redirects.
 * @param name - Redirect rule name
 * @param source - Source URL
 * @param destination - Destination URL
 * @param options - Redirect options (optional)
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_single_redirect
 */
declare function CF_SINGLE_REDIRECT(
  name: string,
  source: string,
  destination: string,
  options?: CfSingleRedirectOptions
): DomainModifier;

// =============================================================================
// CLOUDFLARE WORKERS
// =============================================================================

/**
 * CF_WORKER_ROUTE() creates a Cloudflare Worker route.
 * @param pattern - URL pattern to match (e.g., "example.com/*")
 * @param workerName - Name of the Worker script to run
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_worker_route
 */
declare function CF_WORKER_ROUTE(pattern: string, workerName: string): DomainModifier;

// =============================================================================
// CLOUDFLARE UNIVERSAL SSL
// =============================================================================

/**
 * CF_UNIVERSALSSL_ON() enables Universal SSL for the domain.
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_universalssl
 */
declare function CF_UNIVERSALSSL_ON(): DomainModifier;

/**
 * CF_UNIVERSALSSL_OFF() disables Universal SSL for the domain.
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_universalssl
 */
declare function CF_UNIVERSALSSL_OFF(): DomainModifier;


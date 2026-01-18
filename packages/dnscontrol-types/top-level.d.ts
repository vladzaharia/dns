/**
 * DNSControl Top-Level Functions
 * Functions called at the global scope for configuration
 *
 * @packageDocumentation
 */

/// <reference path="base.d.ts" />

// =============================================================================
// DOMAIN DEFINITION FUNCTIONS
// =============================================================================

/**
 * D() defines a domain and its records.
 * @param name - The domain name (e.g., "example.com")
 * @param registrar - The registrar identifier from NewRegistrar()
 * @param modifiers - Domain modifiers (DnsProvider, records, etc.)
 * @see https://docs.dnscontrol.org/language-reference/top-level-functions/d
 */
declare function D(name: string, registrar: string, ...modifiers: DomainModifier[]): void;

/**
 * D_EXTEND() extends an existing domain with additional records.
 * @param name - The domain name to extend
 * @param modifiers - Additional domain modifiers
 * @see https://docs.dnscontrol.org/language-reference/top-level-functions/d_extend
 */
declare function D_EXTEND(name: string, ...modifiers: DomainModifier[]): void;

/**
 * DEFAULTS() sets default modifiers for all subsequent D() calls.
 * @param modifiers - Default domain modifiers
 * @see https://docs.dnscontrol.org/language-reference/top-level-functions/defaults
 */
declare function DEFAULTS(...modifiers: DomainModifier[]): void;

/**
 * DOMAIN_ELSEWHERE() declares a domain that is managed elsewhere.
 * @param name - The domain name
 * @param registrar - The registrar identifier
 * @param nameservers - Array of nameserver hostnames
 * @see https://docs.dnscontrol.org/language-reference/top-level-functions/domain_elsewhere
 */
declare function DOMAIN_ELSEWHERE(name: string, registrar: string, nameservers: string[]): void;

/**
 * DOMAIN_ELSEWHERE_AUTO() declares a domain managed elsewhere with auto-detected nameservers.
 * @param name - The domain name
 * @param registrar - The registrar identifier
 * @param dnsProvider - The DNS provider identifier
 * @see https://docs.dnscontrol.org/language-reference/top-level-functions/domain_elsewhere_auto
 */
declare function DOMAIN_ELSEWHERE_AUTO(name: string, registrar: string, dnsProvider: string): void;

// =============================================================================
// PROVIDER CREATION FUNCTIONS
// =============================================================================

/**
 * NewDnsProvider() creates a new DNS provider.
 * @param name - Provider identifier
 * @param type - Provider type (optional, defaults to name)
 * @param meta - Provider-specific metadata
 * @returns Provider identifier string
 * @see https://docs.dnscontrol.org/language-reference/top-level-functions/newdnsprovider
 */
declare function NewDnsProvider(name: string, type?: string, meta?: ProviderMeta): string;

/**
 * NewRegistrar() creates a new domain registrar.
 * @param name - Registrar identifier
 * @param type - Registrar type (optional, defaults to name)
 * @param meta - Registrar-specific metadata
 * @returns Registrar identifier string
 * @see https://docs.dnscontrol.org/language-reference/top-level-functions/newregistrar
 */
declare function NewRegistrar(name: string, type?: string, meta?: ProviderMeta): string;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * FETCH() fetches content from a URL (for use in configuration).
 * @param url - The URL to fetch
 * @param options - Optional fetch options
 * @returns The fetched content as a string
 * @see https://docs.dnscontrol.org/language-reference/top-level-functions/fetch
 */
declare function FETCH(url: string, options?: { headers?: Record<string, string> }): string;

/**
 * HASH() generates a hash of the input string.
 * @param algorithm - Hash algorithm (e.g., "md5", "sha1", "sha256", "sha512")
 * @param data - Data to hash
 * @returns The hash as a hex string
 * @see https://docs.dnscontrol.org/language-reference/top-level-functions/hash
 */
declare function HASH(algorithm: "md5" | "sha1" | "sha256" | "sha512" | string, data: string): string;

/**
 * IP() converts an IP address string to a numeric value.
 * Useful for arithmetic operations on IP addresses.
 * @param address - IP address string (e.g., "1.2.3.4")
 * @returns Numeric IP address value
 * @see https://docs.dnscontrol.org/language-reference/top-level-functions/ip
 */
declare function IP(address: string): number;

/**
 * PANIC() stops execution with an error message.
 * @param message - Error message
 * @see https://docs.dnscontrol.org/language-reference/top-level-functions/panic
 */
declare function PANIC(message: string): never;

/**
 * REV() converts an IP address to reverse DNS notation.
 * @param address - IP address (e.g., "1.2.3.4" or "2001:db8::1")
 * @returns Reverse DNS zone name (e.g., "4.3.2.1.in-addr.arpa")
 * @see https://docs.dnscontrol.org/language-reference/top-level-functions/rev
 */
declare function REV(address: string): string;

/**
 * REVCOMPAT() enables compatibility mode for reverse DNS.
 * @param address - IP address
 * @returns Reverse DNS zone name in compatibility format
 * @see https://docs.dnscontrol.org/language-reference/top-level-functions/revcompat
 */
declare function REVCOMPAT(address: string): string;

/**
 * getConfiguredDomains() returns a list of configured domain names.
 * @returns Array of domain names
 * @see https://docs.dnscontrol.org/language-reference/top-level-functions/getconfigureddomains
 */
declare function getConfiguredDomains(): string[];

// =============================================================================
// MODULE FUNCTIONS
// =============================================================================

/**
 * require() loads a JavaScript file.
 * @param path - Path to the JavaScript file
 * @see https://docs.dnscontrol.org/language-reference/top-level-functions/require
 */
declare function require(path: string): unknown;

/**
 * require_glob() loads multiple JavaScript files matching a glob pattern.
 * @param pattern - Glob pattern for files to load
 * @see https://docs.dnscontrol.org/language-reference/top-level-functions/require_glob
 */
declare function require_glob(pattern: string): void;


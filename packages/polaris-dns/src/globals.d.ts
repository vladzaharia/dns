/**
 * Global type declarations for DNSControl environment
 *
 * These types declare the runtime environment provided by DNSControl's JavaScript engine.
 * They are ambient declarations that make the global functions and types available.
 */

// =============================================================================
// PRIMITIVE TYPES
// =============================================================================

/** TTL value - can be a number (seconds) or a string duration (e.g., "1h", "1d", "300") */
declare type Ttl = string | number;

/** IP address type - can be a string or numeric value from IP() */
declare type IpAddress = string | number;

// =============================================================================
// MODIFIER TYPES (Branded/Opaque types for type safety)
// =============================================================================

/** Domain modifier - returned by record functions and domain configuration functions */
declare interface DomainModifier {
  readonly __brand: "DomainModifier";
}

/** Record modifier - returned by TTL() and provider-specific record modifiers */
declare interface RecordModifier {
  readonly __brand: "RecordModifier";
}

/** Provider metadata object for NewDnsProvider() and NewRegistrar() */
declare type ProviderMeta = Record<string, string | number | boolean>;

/** Record metadata object for custom properties passed to record functions */
declare type RecordMeta = Record<string, string | number | boolean>;

// =============================================================================
// CAA TYPES
// =============================================================================

/** CAA record tag types */
declare type CaaTag =
  | "issue"
  | "issuewild"
  | "iodef"
  | "contactemail"
  | "contactphone"
  | "issuemail"
  | "issuevmc";

// =============================================================================
// DOMAIN DEFINITION FUNCTIONS
// =============================================================================

/** D() defines a domain and its records */
declare function D(name: string, registrar: string, ...modifiers: DomainModifier[]): void;

/** D_EXTEND() extends an existing domain with additional records */
declare function D_EXTEND(name: string, ...modifiers: DomainModifier[]): void;

// =============================================================================
// PROVIDER CREATION FUNCTIONS
// =============================================================================

/** NewDnsProvider() creates a new DNS provider */
declare function NewDnsProvider(name: string, type?: string, meta?: ProviderMeta): string;

/** NewRegistrar() creates a new domain registrar */
declare function NewRegistrar(name: string, type?: string, meta?: ProviderMeta): string;

// =============================================================================
// DNS RECORD FUNCTIONS
// =============================================================================

/** A() adds an A record (IPv4 address) */
declare function A(
  name: string,
  address: IpAddress,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/** AAAA() adds an AAAA record (IPv6 address) */
declare function AAAA(
  name: string,
  address: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/** CNAME() adds a CNAME record */
declare function CNAME(
  name: string,
  target: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/** MX() adds an MX record (mail exchange) */
declare function MX(
  name: string,
  priority: number,
  target: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/** NS() adds an NS record (nameserver delegation) */
declare function NS(
  name: string,
  target: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/** TXT() adds a TXT record */
declare function TXT(
  name: string,
  contents: string | string[],
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/** SRV() adds an SRV record (service location) */
declare function SRV(
  name: string,
  priority: number,
  weight: number,
  port: number,
  target: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/** CAA() adds a CAA record (certificate authority authorization) */
declare function CAA(
  name: string,
  tag: CaaTag,
  value: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

// =============================================================================
// RECORD MODIFIERS
// =============================================================================

/** TTL() sets the TTL for a specific record */
declare function TTL(ttl: Ttl): RecordModifier;

// =============================================================================
// DOMAIN MODIFIERS
// =============================================================================

/** DnsProvider() specifies the DNS provider for a domain */
declare function DnsProvider(name: string, nsCount?: number): DomainModifier;

/** DefaultTTL() sets the default TTL for all records in the domain */
declare function DefaultTTL(ttl: Ttl): DomainModifier;

/** IGNORE() ignores records matching the specified criteria */
declare function IGNORE(pattern: string, recordTypes?: string, targets?: string): DomainModifier;

/** IGNORE_NAME() ignores records by name pattern */
declare function IGNORE_NAME(pattern: string, recordTypes?: string): DomainModifier;

// =============================================================================
// CLOUDFLARE-SPECIFIC FUNCTIONS
// =============================================================================

/** CF_PROXY_ON() enables Cloudflare proxy (orange cloud) for a record */
declare function CF_PROXY_ON(): RecordModifier;

/** CF_PROXY_OFF() disables Cloudflare proxy (grey cloud) for a record */
declare function CF_PROXY_OFF(): RecordModifier;

/** CF_REDIRECT() creates a 301 permanent redirect using Cloudflare Page Rules */
declare function CF_REDIRECT(source: string, destination: string): DomainModifier;

/** CF_TEMP_REDIRECT() creates a 302 temporary redirect using Cloudflare Page Rules */
declare function CF_TEMP_REDIRECT(source: string, destination: string): DomainModifier;

// =============================================================================
// CONSOLE (DNSControl runtime)
// =============================================================================

/**
 * Console object for logging
 * Available in DNSControl's JavaScript runtime
 */
declare const console: {
  log(...args: unknown[]): void;
  error(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  info(...args: unknown[]): void;
  debug(...args: unknown[]): void;
};

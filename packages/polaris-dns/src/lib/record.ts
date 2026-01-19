/**
 * DNS Record Builders Module
 *
 * Provides type-safe builder functions for creating DNS records in Polaris DNS.
 * These functions wrap DNSControl's record functions (A, AAAA, CNAME, etc.)
 * with a consistent API and automatic handling of Cloudflare proxy settings.
 *
 * @example
 * ```typescript
 * import {
 *   createARecord,
 *   createCNAMERecord,
 *   createMXRecord,
 *   createTXTRecord,
 * } from "./lib/record.js";
 *
 * // Basic records
 * createARecord("@", "192.0.2.1");
 * createCNAMERecord("www", "@");
 *
 * // With options
 * createARecord("api", "192.0.2.2", { proxy: "off", ttl: 60 });
 *
 * // Mail records
 * createMXRecord("@", 10, "mail.example.com.");
 * createTXTRecord("@", "v=spf1 include:_spf.google.com ~all");
 * ```
 *
 * @module lib/record
 * @packageDocumentation
 */

import type { ProxyStatus, RecordOptions, ServerName } from "./types.js";
import { getServer, getServerHostname, getServerIP } from "./server.js";

// =============================================================================
// Record Builder Options
// =============================================================================

/**
 * Options for creating service records that point to servers.
 *
 * @example
 * ```typescript
 * const options: ServiceRecordOptions = {
 *   proxy: "on",      // Enable Cloudflare proxy
 *   useTunnel: false, // Use direct connection
 *   ttl: 300,         // 5 minute TTL
 * };
 * ```
 */
export interface ServiceRecordOptions {
  /**
   * Cloudflare proxy status.
   * - `"on"` - Route traffic through Cloudflare (default for most services)
   * - `"off"` - Direct connection to origin (required for non-HTTP services)
   * @default "on"
   */
  proxy?: ProxyStatus;

  /**
   * Whether to use the Azure tunnel (Pangolin) instead of direct connection.
   * When true, creates a CNAME to the tunnel hostname instead of an A record.
   * @default false
   */
  useTunnel?: boolean;

  /**
   * Custom TTL in seconds.
   * If not specified, uses the domain's default TTL.
   */
  ttl?: number;
}

// =============================================================================
// Core Record Builders
// =============================================================================

/**
 * Build modifiers array from options
 * Uses the global CF_PROXY_ON() and CF_PROXY_OFF() functions from DNSControl
 */
function buildModifiers(options?: RecordOptions): RecordModifier[] {
  const modifiers: RecordModifier[] = [];

  if (options?.proxy === "on") {
    modifiers.push(CF_PROXY_ON());
  } else if (options?.proxy === "off") {
    modifiers.push(CF_PROXY_OFF());
  }

  if (options?.ttl !== undefined) {
    modifiers.push(TTL(options.ttl));
  }

  return modifiers;
}

/**
 * Creates an A record (IPv4 address).
 *
 * @param name - Record name (`@` for apex, or subdomain like `www`)
 * @param ip - IPv4 address (e.g., `192.0.2.1`)
 * @param options - Optional record modifiers (proxy, TTL)
 * @returns DNSControl domain modifier
 *
 * @example
 * ```typescript
 * // Root domain
 * createARecord("@", "192.0.2.1");
 *
 * // Subdomain with proxy disabled
 * createARecord("api", "192.0.2.2", { proxy: "off" });
 *
 * // With custom TTL
 * createARecord("status", "192.0.2.3", { ttl: 60 });
 * ```
 */
export function createARecord(name: string, ip: string, options?: RecordOptions): DomainModifier {
  return A(name, ip, ...buildModifiers(options));
}

/**
 * Creates an AAAA record (IPv6 address).
 *
 * @param name - Record name (`@` for apex, or subdomain)
 * @param ip - IPv6 address (e.g., `2001:db8::1`)
 * @param options - Optional record modifiers (proxy, TTL)
 * @returns DNSControl domain modifier
 *
 * @example
 * ```typescript
 * createAAAARecord("@", "2001:db8::1");
 * createAAAARecord("ipv6", "2001:db8::2", { proxy: "on" });
 * ```
 */
export function createAAAARecord(
  name: string,
  ip: string,
  options?: RecordOptions
): DomainModifier {
  return AAAA(name, ip, ...buildModifiers(options));
}

/**
 * Creates a CNAME record (canonical name/alias).
 *
 * @param name - Record name (cannot be `@` - use A/AAAA for apex)
 * @param target - Target hostname (use `@` for same domain, or FQDN with trailing dot)
 * @param options - Optional record modifiers (proxy, TTL)
 * @returns DNSControl domain modifier
 *
 * @example
 * ```typescript
 * // Point www to apex
 * createCNAMERecord("www", "@");
 *
 * // Point to external service
 * createCNAMERecord("blog", "hashnode.network.");
 *
 * // With proxy enabled
 * createCNAMERecord("app", "myapp.herokuapp.com.", { proxy: "on" });
 * ```
 *
 * @remarks
 * CNAME records cannot coexist with other record types at the same name.
 * For apex domains, use A/AAAA records or ALIAS (if supported by provider).
 */
export function createCNAMERecord(
  name: string,
  target: string,
  options?: RecordOptions
): DomainModifier {
  return CNAME(name, target, ...buildModifiers(options));
}

/**
 * Creates an MX record (mail exchange).
 *
 * @param name - Record name (`@` for domain mail, or subdomain)
 * @param priority - Mail server priority (lower = higher priority)
 * @param target - Mail server hostname (must end with `.`)
 * @param options - Optional record modifiers (TTL)
 * @returns DNSControl domain modifier
 *
 * @example
 * ```typescript
 * // Primary mail server
 * createMXRecord("@", 10, "mail.example.com.");
 *
 * // Backup mail server
 * createMXRecord("@", 20, "mail2.example.com.");
 *
 * // Fastmail
 * createMXRecord("@", 10, "in1-smtp.messagingengine.com.");
 * createMXRecord("@", 20, "in2-smtp.messagingengine.com.");
 * ```
 */
export function createMXRecord(
  name: string,
  priority: number,
  target: string,
  options?: RecordOptions
): DomainModifier {
  return MX(name, priority, target, ...buildModifiers(options));
}

/**
 * Creates a TXT record (text).
 *
 * @param name - Record name (`@` for apex, or subdomain)
 * @param content - Text content (automatically handled for long strings)
 * @param options - Optional record modifiers (TTL)
 * @returns DNSControl domain modifier
 *
 * @example
 * ```typescript
 * // SPF record
 * createTXTRecord("@", "v=spf1 include:_spf.google.com ~all");
 *
 * // Domain verification
 * createTXTRecord("@", "google-site-verification=abc123");
 *
 * // DKIM record
 * createTXTRecord("selector._domainkey", "v=DKIM1; k=rsa; p=MIIBIjAN...");
 *
 * // DMARC record
 * createTXTRecord("_dmarc", "v=DMARC1; p=reject; rua=mailto:dmarc@example.com");
 * ```
 */
export function createTXTRecord(
  name: string,
  content: string,
  options?: RecordOptions
): DomainModifier {
  return TXT(name, content, ...buildModifiers(options));
}

/**
 * Creates an SRV record (service location).
 *
 * @param name - Service name in format `_service._protocol` (e.g., `_sip._tcp`)
 * @param priority - Server priority (lower = higher priority)
 * @param weight - Relative weight for load balancing
 * @param port - Service port number
 * @param target - Server hostname (must end with `.`)
 * @param options - Optional record modifiers (TTL)
 * @returns DNSControl domain modifier
 *
 * @example
 * ```typescript
 * // SIP service
 * createSRVRecord("_sip._tcp", 10, 5, 5060, "sipserver.example.com.");
 *
 * // XMPP client
 * createSRVRecord("_xmpp-client._tcp", 5, 0, 5222, "xmpp.example.com.");
 *
 * // Minecraft server
 * createSRVRecord("_minecraft._tcp", 0, 0, 25565, "mc.example.com.");
 * ```
 */
export function createSRVRecord(
  name: string,
  priority: number,
  weight: number,
  port: number,
  target: string,
  options?: RecordOptions
): DomainModifier {
  return SRV(name, priority, weight, port, target, ...buildModifiers(options));
}

/**
 * Creates a CAA record (Certificate Authority Authorization).
 *
 * @param name - Record name (`@` for apex)
 * @param tag - CAA tag type
 * @param value - CA domain or reporting URI
 * @param options - Optional record modifiers (TTL)
 * @returns DNSControl domain modifier
 *
 * @example
 * ```typescript
 * // Allow Let's Encrypt to issue certificates
 * createCAARecord("@", "issue", "letsencrypt.org");
 *
 * // Disallow wildcard certificates
 * createCAARecord("@", "issuewild", ";");
 *
 * // Report violations
 * createCAARecord("@", "iodef", "mailto:security@example.com");
 * ```
 */
export function createCAARecord(
  name: string,
  tag: "issue" | "issuewild" | "iodef",
  value: string,
  options?: RecordOptions
): DomainModifier {
  return CAA(name, tag, value, ...buildModifiers(options));
}

// =============================================================================
// Service Record Builders
// =============================================================================

/**
 * Create a service record pointing to a server
 * Automatically handles routing strategy (direct, tunnel, proxied)
 */
export function createServiceRecord(
  subdomain: string,
  server: ServerName,
  options: ServiceRecordOptions = {}
): DomainModifier {
  const serverInfo = getServer(server);
  const { proxy = "on", useTunnel = false } = options;

  if (useTunnel) {
    // Use CNAME to Azure tunnel
    const tunnelHostname = getServerHostname("pangolin");
    return createCNAMERecord(subdomain, tunnelHostname + ".", {
      proxy: proxy === "on" ? "on" : "off",
      ttl: options.ttl,
    });
  } else {
    // Direct A record to server IP
    return createARecord(subdomain, serverInfo.ip, {
      proxy: proxy === "on" ? "on" : "off",
      ttl: options.ttl,
    });
  }
}

/**
 * Create a CNAME record pointing to a server's hostname
 */
export function createServerCNAME(
  subdomain: string,
  server: ServerName,
  options?: RecordOptions
): DomainModifier {
  const hostname = getServerHostname(server);
  return createCNAMERecord(subdomain, hostname + ".", options);
}

/**
 * Create an A record pointing to a server's IP
 */
export function createServerARecord(
  subdomain: string,
  server: ServerName,
  options?: RecordOptions
): DomainModifier {
  const ip = getServerIP(server);
  return createARecord(subdomain, ip, options);
}

/**
 * DNS Record builders and utilities
 */

import type { ProxyStatus, RecordOptions, ServerName } from "./types.js";
import { getServer, getServerHostname, getServerIP } from "./server.js";

// Cloudflare proxy modifiers (objects, not functions)
const CF_PROXY_ON = { cloudflare_proxy: "on" };
const CF_PROXY_OFF = { cloudflare_proxy: "off" };

// =============================================================================
// Record Builder Options
// =============================================================================

export interface ServiceRecordOptions {
  /** Cloudflare proxy status (default: "on" for direct/proxied, "off" for tunnel) */
  proxy?: ProxyStatus;
  /** Use Azure tunnel instead of direct connection */
  useTunnel?: boolean;
  /** Custom TTL */
  ttl?: number;
}

// =============================================================================
// Core Record Builders
// =============================================================================

/**
 * Build modifiers array from options
 */
function buildModifiers(options?: RecordOptions): RecordModifier[] {
  const modifiers: RecordModifier[] = [];

  if (options?.proxy === "on") {
    modifiers.push(CF_PROXY_ON as RecordModifier);
  } else if (options?.proxy === "off") {
    modifiers.push(CF_PROXY_OFF as RecordModifier);
  }

  if (options?.ttl !== undefined) {
    modifiers.push(TTL(options.ttl));
  }

  return modifiers;
}

/**
 * Create an A record
 */
export function createARecord(name: string, ip: string, options?: RecordOptions): DomainModifier {
  return A(name, ip, ...buildModifiers(options));
}

/**
 * Create an AAAA record
 */
export function createAAAARecord(
  name: string,
  ip: string,
  options?: RecordOptions
): DomainModifier {
  return AAAA(name, ip, ...buildModifiers(options));
}

/**
 * Create a CNAME record
 */
export function createCNAMERecord(
  name: string,
  target: string,
  options?: RecordOptions
): DomainModifier {
  return CNAME(name, target, ...buildModifiers(options));
}

/**
 * Create an MX record
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
 * Create a TXT record
 */
export function createTXTRecord(
  name: string,
  content: string,
  options?: RecordOptions
): DomainModifier {
  return TXT(name, content, ...buildModifiers(options));
}

/**
 * Create an SRV record
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
 * Create a CAA record
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

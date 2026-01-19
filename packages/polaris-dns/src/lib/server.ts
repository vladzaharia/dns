/**
 * Server Registry Module
 *
 * Provides a centralized registry of servers used in Polaris DNS.
 * Each server has a name, location, hostname, and IP address that can be
 * used to create DNS records pointing to infrastructure.
 *
 * @example
 * ```typescript
 * import { getServer, getServerIP, getServerHostname } from "./lib/server.js";
 *
 * // Get full server info
 * const server = getServer("greenwood");
 * console.log(server.ip);       // "67.185.194.56"
 * console.log(server.hostname); // "gw.sea.plrs.im"
 *
 * // Get specific properties
 * const ip = getServerIP("pangolin");
 * const hostname = getServerHostname("reprise1");
 * ```
 *
 * @module lib/server
 * @packageDocumentation
 */

import type { Server, ServerName, ServerRegistry } from "./types.js";

// =============================================================================
// Server Definitions
// =============================================================================

/**
 * Central server registry containing all server definitions
 */
export const servers: ServerRegistry = {
  greenwood: {
    name: "greenwood",
    location: "sea",
    prefix: "gw",
    hostname: "gw.sea.plrs.im",
    ip: "67.185.194.56",
    isDDNS: true,
  },
  caphill: {
    name: "caphill",
    location: "sea",
    prefix: "ch",
    hostname: "ch.sea.plrs.im",
    ip: "97.113.197.175",
    isDDNS: true,
  },
  pangolin: {
    name: "pangolin",
    location: "qnc",
    prefix: "tun",
    hostname: "tun.qnc.plrs.im",
    ip: "172.179.0.103",
  },
  upvpn: {
    name: "upvpn",
    location: "qnc",
    prefix: "upvpn",
    hostname: "upvpn.qnc.plrs.im",
    ip: "20.3.240.145",
  },
  reprise1: {
    name: "reprise1",
    location: "re",
    prefix: "re1",
    hostname: "re1.re.plrs.im",
    ip: "104.37.168.87",
  },
  reprise2: {
    name: "reprise2",
    location: "re",
    prefix: "re2",
    hostname: "re2.re.plrs.im",
    ip: "104.37.168.88",
  },
  reprise3: {
    name: "reprise3",
    location: "re",
    prefix: "re3",
    hostname: "re3.re.plrs.im",
    ip: "104.37.168.89",
  },
  reprise4: {
    name: "reprise4",
    location: "re",
    prefix: "re4",
    hostname: "re4.re.plrs.im",
    ip: "104.37.168.90",
  },
  "local-traefik": {
    name: "local-traefik",
    location: "local",
    prefix: "traefik",
    hostname: "traefik.local",
    ip: "10.10.1.20",
  },
} as const;

// =============================================================================
// Server Utilities
// =============================================================================

/**
 * Get a server by name
 */
export function getServer(name: ServerName): Server {
  return servers[name];
}

/**
 * Get the IP address for a server
 */
export function getServerIP(name: ServerName): string {
  return servers[name].ip;
}

/**
 * Get the hostname for a server
 */
export function getServerHostname(name: ServerName): string {
  return servers[name].hostname;
}

/**
 * Get the prefix for a server
 */
export function getServerPrefix(name: ServerName): string {
  return servers[name].prefix;
}

/**
 * Check if a server uses DDNS
 */
export function isServerDDNS(name: ServerName): boolean {
  return servers[name].isDDNS ?? false;
}

/**
 * Get all servers in a specific location
 */
export function getServersByLocation(location: Server["location"]): Server[] {
  return Object.values(servers).filter((server) => server.location === location);
}

/**
 * Get all server names
 */
export function getAllServerNames(): ServerName[] {
  return Object.keys(servers) as ServerName[];
}

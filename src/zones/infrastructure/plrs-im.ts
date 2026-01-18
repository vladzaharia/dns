/**
 * plrs.im - Server infrastructure domain
 *
 * This domain hosts the canonical server hostnames using a clean naming convention:
 * - {prefix}.{location}.plrs.im for location-based servers
 * - {prefix}.{provider}.plrs.im for cloud-based servers
 * - ext.plrs.im for external service references
 *
 * Records are automatically generated from the server registry.
 *
 * Server Locations:
 * - sea: Seattle (Greenwood, Capitol Hill)
 * - az: Azure (tunnel, VPN)
 * - re: Reprise (re1-re4)
 *
 * External Services (ext subdomain):
 * - External services like Fly.io, Netlify, etc. can be referenced here
 * - This provides a central location for external service CNAMEs
 */

import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";
import { createARecord, createCNAMERecord } from "../../lib/record.js";
import { servers } from "../../lib/server.js";

// =============================================================================
// DNSControl DSL Declarations
// =============================================================================

declare function IGNORE_NAME(name: string, types?: string): unknown;

// =============================================================================
// Zone Definition
// =============================================================================

const DOMAIN = "plrs.im";

/**
 * Generate DNS records for all servers in the registry
 */
function generateServerRecords(): unknown[] {
  const records: unknown[] = [];
  const ignored: unknown[] = [];

  // Use Object.keys + index lookup for ES5 compatibility
  const serverNames = Object.keys(servers);
  for (let i = 0; i < serverNames.length; i++) {
    const serverName = serverNames[i] as keyof typeof servers;
    const server = servers[serverName];

    // Skip local/internal servers (not publicly routable)
    // Use indexOf for ES5 compatibility (no startsWith)
    if (
      server.location === "local" ||
      server.ip.indexOf("10.") === 0 ||
      server.ip.indexOf("192.168.") === 0
    ) {
      continue;
    }

    // Build subdomain from prefix and location
    const subdomain = server.prefix + "." + server.location;

    if (server.isDDNS) {
      // DDNS-managed records are ignored (managed by router/DDNS client)
      ignored.push(IGNORE_NAME(subdomain));
    } else {
      // Static IP records
      records.push(createARecord(subdomain, server.ip, { proxy: "off" }));
    }
  }

  // Use concat for ES5 compatibility
  return records.concat(ignored);
}

/**
 * Generate external service reference records
 * These provide a central location for external service CNAMEs
 */
function generateExternalServiceRecords(): unknown[] {
  return [
    // Fly.io services
    createCNAMERecord("fly.ext", "fly.io.", { proxy: "off" }),

    // Netlify services
    createCNAMERecord("netlify.ext", "netlify.app.", { proxy: "off" }),

    // Cloudflare Pages
    createCNAMERecord("pages.ext", "pages.dev.", { proxy: "off" }),

    // Vercel
    createCNAMERecord("vercel.ext", "vercel.app.", { proxy: "off" }),
  ];
}

export function registerPlrsIm(): void {
  console.log(`Zone: ${DOMAIN} - Server Infrastructure`);

  createDomain(
    {
      name: DOMAIN,
      category: "infrastructure",
      registrar: NO_REGISTRAR,
      dnsProvider: CLOUDFLARE,
    },

    // Server hostname records
    ...generateServerRecords(),

    // External service references (ext subdomain)
    ...generateExternalServiceRecords()
  );
}

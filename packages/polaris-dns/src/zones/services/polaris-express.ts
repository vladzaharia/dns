/**
 * polaris.express - EV Charging Services
 *
 * This domain hosts EV charging-related services:
 * - Main site via Cloudflare Pages
 * - ocpp: StEvE OCPP server
 * - billing: Lago Billing API
 * - manage: ExpressSync management interface
 */

import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";
import { createCNAMERecord } from "../../lib/record.js";
import { servers } from "../../lib/server.js";
import { createCloudflareEmailRecords } from "../../mail/cloudflare.js";

// =============================================================================
// Zone Definition
// =============================================================================

const DOMAIN = "polaris.express";

export function registerPolarisExpress(): void {
  console.log(`Zone: ${DOMAIN} - EV Charging Services`);

  createDomain(
    {
      name: DOMAIN,
      category: "services",
      registrar: NO_REGISTRAR,
      dnsProvider: CLOUDFLARE,
    },

    // Cloudflare Pages - EV Charging site
    // Note: Root domain uses ALIAS/CNAME flattening via Cloudflare
    // The @ record is managed by Cloudflare for Pages integration
    createCNAMERecord("www", "charging.pages.dev.", { proxy: "on" }),

    // EV Charging Services (via Azure tunnel)
    createCNAMERecord("ocpp", servers.pangolin.hostname + ".", { proxy: "on" }), // StEvE OCPP server
    createCNAMERecord("billing", servers.pangolin.hostname + ".", { proxy: "on" }), // Lago Billing API
    createCNAMERecord("manage", servers.pangolin.hostname + ".", { proxy: "on" }), // ExpressSync

    // Mail (Cloudflare Email Routing)
    ...createCloudflareEmailRecords(),

    // Cloudflare-managed records (ignored)
    // Root @ is managed by Cloudflare Pages integration
    IGNORE_NAME("@", "A,CNAME,AAAA"),
    IGNORE_NAME("cf2024-1._domainkey")
  );
}

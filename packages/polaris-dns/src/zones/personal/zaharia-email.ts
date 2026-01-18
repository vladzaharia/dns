/**
 * zaharia.email - Family email domain
 *
 * Uses Cloudflare Email Routing for forwarding to personal inboxes.
 */

import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";
import { createTXTRecord } from "../../lib/record.js";
import { createCloudflareEmailRecords } from "../../mail/cloudflare.js";

// =============================================================================
// Zone Definition
// =============================================================================

const DOMAIN = "zaharia.email";

export function registerZahariaEmail(): void {
  console.log(`Zone: ${DOMAIN} - Family Email`);

  createDomain(
    {
      name: DOMAIN,
      category: "personal",
      registrar: NO_REGISTRAR,
      dnsProvider: CLOUDFLARE,
    },

    // Mail (Cloudflare Email Routing)
    ...createCloudflareEmailRecords(),

    // Domain verification records
    createTXTRecord("@", "MS=ms66850642")
  );
}

/**
 * famjam.ing - Family email domain
 *
 * Email-only domain for family use with Cloudflare Email Routing.
 * No website.
 */

import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";
import { createCloudflareEmailRecords } from "../../mail/cloudflare.js";

// =============================================================================
// Zone Definition
// =============================================================================

const DOMAIN = "famjam.ing";

export function registerFamjamIng(): void {
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

    // No website - ignore root records
    IGNORE_NAME("@", "A,CNAME,AAAA")
  );
}

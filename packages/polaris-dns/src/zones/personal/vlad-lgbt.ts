/**
 * vlad.lgbt - Redirect to vlad.gg
 */

import { createDomain, CLOUDFLARE_WITH_REDIRECTS, NO_REGISTRAR } from "../../lib/domain.js";
import { createTXTRecord } from "../../lib/record.js";
import { createFastmailRecords } from "../../mail/fastmail.js";

// =============================================================================
// Zone Definition
// =============================================================================

const DOMAIN = "vlad.lgbt";

export function registerVladLGBT(): void {
  console.log(`Zone: ${DOMAIN} - vlad.gg Redirect`);

  createDomain(
    {
      name: DOMAIN,
      category: "personal",
      registrar: NO_REGISTRAR,
      dnsProvider: CLOUDFLARE_WITH_REDIRECTS,
    },

    // Redirect all to vlad.gg
    CF_REDIRECT("*vlad.lgbt/*", "https://vlad.gg/$2"),

    // Mail (Fastmail)
    ...createFastmailRecords({ domain: DOMAIN }),

    // Domain verification records
    createTXTRecord("_atproto", "did=did:plc:eykvgeqaqtyspquyx5wozboq"),

    // Cloudflare-managed records (ignored)
    IGNORE_NAME("@", "A,CNAME,AAAA"),
    IGNORE_NAME("www", "A,CNAME,AAAA"),
    IGNORE_NAME("cf2024-1._domainkey")
  );
}

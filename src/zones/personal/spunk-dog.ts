/**
 * spunk.dog - BlueSky handle domain
 *
 * Used for BlueSky verification. No website.
 */

import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";
import { createTXTRecord } from "../../lib/record.js";
import { createFastmailRecords } from "../../mail/fastmail.js";

// =============================================================================
// DNSControl DSL Declarations
// =============================================================================

declare function IGNORE_NAME(name: string, types?: string): unknown;

// =============================================================================
// Zone Definition
// =============================================================================

const DOMAIN = "spunk.dog";

export function registerSpunkDog(): void {
  console.log(`Zone: ${DOMAIN} - BlueSky Handle`);

  createDomain(
    {
      name: DOMAIN,
      category: "personal",
      registrar: NO_REGISTRAR,
      dnsProvider: CLOUDFLARE,
    },

    // BlueSky verification (AT Protocol)
    // Replace with actual DID when available
    createTXTRecord("_atproto", "did=did:plc:REPLACE_WITH_ACTUAL_DID"),

    // Mail (Fastmail) - for future use
    ...createFastmailRecords({ domain: DOMAIN }),

    // No website - ignore root records
    IGNORE_NAME("@", "A,CNAME,AAAA")
  );
}


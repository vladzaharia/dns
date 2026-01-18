/**
 * Cloudflare Email Routing configuration
 *
 * Cloudflare Email Routing is used for domains that forward email
 * to other providers (like Gmail, Fastmail, etc.)
 * Documentation: https://developers.cloudflare.com/email-routing/
 */

import { createMXRecord, createTXTRecord } from "../lib/record.js";

// =============================================================================
// Cloudflare Email Routing Configuration
// =============================================================================

const CLOUDFLARE_MX_1 = "route1.mx.cloudflare.net.";
const CLOUDFLARE_MX_2 = "route2.mx.cloudflare.net.";
const CLOUDFLARE_MX_3 = "route3.mx.cloudflare.net.";

// =============================================================================
// Cloudflare Email Routing Record Builders
// =============================================================================

export interface CloudflareEmailOptions {
  /** Root record name (default: "@") */
  rootRecord?: string;
  /** DMARC policy (default: "none") */
  dmarcPolicy?: "none" | "quarantine" | "reject";
  /** DMARC reporting email (optional) */
  dmarcReportEmail?: string;
}

/**
 * Create all Cloudflare Email Routing DNS records for a domain
 */
export function createCloudflareEmailRecords(options: CloudflareEmailOptions = {}): unknown[] {
  const { rootRecord = "@", dmarcPolicy = "none", dmarcReportEmail } = options;

  const subdomainSuffix = rootRecord === "@" ? "" : `.${rootRecord}`;
  const records: unknown[] = [];

  // MX records (Cloudflare uses priority 77, 50, 37 by convention)
  records.push(createMXRecord(rootRecord, 77, CLOUDFLARE_MX_1));
  records.push(createMXRecord(rootRecord, 50, CLOUDFLARE_MX_2));
  records.push(createMXRecord(rootRecord, 37, CLOUDFLARE_MX_3));

  // SPF record
  records.push(createTXTRecord(rootRecord, "v=spf1 include:_spf.mx.cloudflare.net ~all"));

  // DMARC record
  let dmarcValue = `v=DMARC1; p=${dmarcPolicy}`;
  if (dmarcReportEmail) {
    dmarcValue += `; rua=mailto:${dmarcReportEmail}`;
  }
  records.push(createTXTRecord(`_dmarc${subdomainSuffix}`, dmarcValue));

  return records;
}


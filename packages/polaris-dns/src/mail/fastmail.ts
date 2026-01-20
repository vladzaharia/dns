/**
 * Fastmail Email Provider Module
 *
 * Provides DNS record builders for configuring Fastmail email on domains.
 * Fastmail is used for personal email domains and provides excellent
 * deliverability with proper SPF, DKIM, and DMARC configuration.
 *
 * @see {@link https://www.fastmail.help/hc/en-us/articles/360060591153 | Fastmail DNS Setup}
 *
 * @example
 * ```typescript
 * import { createFastmailRecords } from "./mail/fastmail.js";
 *
 * createDomain(
 *   { name: "example.com", category: "personal" },
 *   ...createFastmailRecords({ domain: "example.com" }),
 *   // Other records...
 * );
 * ```
 *
 * @module mail/fastmail
 * @packageDocumentation
 */

import { createCNAMERecord, createMXRecord, createTXTRecord } from "../lib/record.js";

// =============================================================================
// Fastmail Configuration
// =============================================================================

const FASTMAIL_MX_PRIMARY = "in1-smtp.messagingengine.com.";
const FASTMAIL_MX_SECONDARY = "in2-smtp.messagingengine.com.";
const FASTMAIL_MAIL_CNAME = "mail.fastmail.com.";
const FASTMAIL_DKIM_DOMAIN = "dkim.fmhosted.com.";

// =============================================================================
// Fastmail Record Builders
// =============================================================================

export interface FastmailOptions {
  /** The domain name (used for DKIM records) */
  domain: string;
  /** Root record name (default: "@") */
  rootRecord?: string;
  /** Include wildcard MX records (default: true) */
  includeWildcard?: boolean;
  /** DMARC policy (default: "none") */
  dmarcPolicy?: "none" | "quarantine" | "reject";
}

/**
 * Create all Fastmail DNS records for a domain
 */
export function createFastmailRecords(options: FastmailOptions): DomainModifier[] {
  const { domain, rootRecord = "@", includeWildcard = true, dmarcPolicy = "none" } = options;

  const subdomainSuffix = rootRecord === "@" ? "" : `.${rootRecord}`;
  const records: DomainModifier[] = [];

  // Mail CNAME for webmail access
  records.push(createCNAMERecord(`mail${subdomainSuffix}`, FASTMAIL_MAIL_CNAME));

  // MX records for root
  records.push(createMXRecord(rootRecord, 10, FASTMAIL_MX_PRIMARY));
  records.push(createMXRecord(rootRecord, 20, FASTMAIL_MX_SECONDARY));

  // Wildcard MX records (for subdomains)
  if (includeWildcard) {
    records.push(createMXRecord(`*${subdomainSuffix}`, 10, FASTMAIL_MX_PRIMARY));
    records.push(createMXRecord(`*${subdomainSuffix}`, 20, FASTMAIL_MX_SECONDARY));
  }

  // SPF record
  records.push(createTXTRecord(rootRecord, "v=spf1 include:spf.messagingengine.com ?all"));

  // DMARC record
  records.push(createTXTRecord(`_dmarc${subdomainSuffix}`, `v=DMARC1; p=${dmarcPolicy}`));

  // DKIM records (fm1, fm2, fm3)
  for (const key of ["fm1", "fm2", "fm3"]) {
    records.push(
      createCNAMERecord(
        `${key}._domainkey${subdomainSuffix}`,
        `${key}.${domain}.${FASTMAIL_DKIM_DOMAIN}`
      )
    );
  }

  return records;
}

/**
 * Create Fastmail records for a subdomain
 */
export function createFastmailSubdomainRecords(
  domain: string,
  subdomain: string
): DomainModifier[] {
  return createFastmailRecords({
    domain,
    rootRecord: subdomain,
  });
}

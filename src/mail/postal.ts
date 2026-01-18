/**
 * Postal mail server configuration
 *
 * Postal is a self-hosted mail server used for transactional email.
 * Documentation: https://docs.postalserver.io/
 */

import {
  createARecord,
  createCNAMERecord,
  createMXRecord,
  createTXTRecord,
} from "../lib/record.js";

// =============================================================================
// Postal Configuration
// =============================================================================

const POSTAL_DOMAIN = "post.polaris.gdn";
const POSTAL_IP = "172.179.244.26";

// DKIM public key for Postal
const POSTAL_DKIM_KEY =
  "v=DKIM1; t=s; h=sha256; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+FS4EPKN7SJtNALxJl30bUZeq2pI0msw9B+XrwYme6cQLFBu8GTsNh8b8DkWJ11/mY/YigtCISQQYzQQwlotRrqfdVaXttxrIdeDWktsatlu0muQh9hYBdN2JCOxtI4DbDe5zCXXGMQVmfJ9rELDWDLPZitFNQG2+7hiJN2hYVwIDAQAB;";

// =============================================================================
// Postal Record Builders
// =============================================================================

export interface PostalDomainOptions {
  /** DKIM key identifiers for this domain */
  dkimKeys?: string[];
  /** Root record name (default: "@") */
  rootRecord?: string;
  /** DMARC policy (default: "none") */
  dmarcPolicy?: "none" | "quarantine" | "reject";
}

/**
 * Create Postal DNS records for a domain that uses Postal for email
 */
export function createPostalRecords(options: PostalDomainOptions = {}): unknown[] {
  const { dkimKeys = [], rootRecord = "@", dmarcPolicy = "none" } = options;

  const subdomainSuffix = rootRecord === "@" ? "" : `.${rootRecord}`;
  const records: unknown[] = [];

  // MX records
  records.push(createMXRecord(rootRecord, 10, `mx.${POSTAL_DOMAIN}.`));
  records.push(createMXRecord(`*${subdomainSuffix}`, 10, `mx.${POSTAL_DOMAIN}.`));

  // Return path CNAME
  records.push(createCNAMERecord(`psrp${subdomainSuffix}`, `rp.${POSTAL_DOMAIN}.`));

  // SPF record
  records.push(createTXTRecord(rootRecord, `v=spf1 a mx include:spf.${POSTAL_DOMAIN} ~all`));

  // DMARC record
  records.push(createTXTRecord(`_dmarc${subdomainSuffix}`, `v=DMARC1; p=${dmarcPolicy}`));

  // DKIM records for each key
  for (const key of dkimKeys) {
    records.push(
      createCNAMERecord(`postal-${key}._domainkey${subdomainSuffix}`, `_dk1.${POSTAL_DOMAIN}.`)
    );
  }

  return records;
}

/**
 * Create the Postal service infrastructure records
 * These are the records needed on polaris.gdn for the Postal server itself
 */
export function createPostalServiceRecords(): unknown[] {
  return [
    // A records for Postal services
    createARecord("mx.post", POSTAL_IP),
    createARecord("post", POSTAL_IP),
    createARecord("track", POSTAL_IP),

    // MX records for Postal routing
    createMXRecord("routes.post", 10, `${POSTAL_DOMAIN}.`),
    createMXRecord("rp.post", 10, `${POSTAL_DOMAIN}.`),

    // SPF for return path domain
    createTXTRecord("rp.post", `v=spf1 a mx include:spf.${POSTAL_DOMAIN} ~all`),

    // DKIM for return path
    createCNAMERecord("postal._domainkey.rp.post", `dk1._domainkey.${POSTAL_DOMAIN}.`),

    // DKIM public key
    createTXTRecord("_dk1.post", POSTAL_DKIM_KEY),
  ];
}

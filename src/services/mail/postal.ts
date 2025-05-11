import { DNSControlRecord } from "../../utils/record";

const POSTAL_DOMAIN = "post.polaris.gdn";

/**
 * Creates records for Hey for Domains.
 * @param mxDomain Beginning part of MX domain
 * @param dnsValidatorId MS= validation ID
 */
export function CreatePostalRecords(
  dkimKeys: string[] = [],
  rootRecord = "@"
): DNSControlRecord[] {
  const subdomainRecord = rootRecord === "@" ? "" : `.${rootRecord}`;

  return [
    MX(rootRecord, 10, `mx.${POSTAL_DOMAIN}.`),
    MX(`*${subdomainRecord}`, 10, `mx.${POSTAL_DOMAIN}.`),
    CNAME(`psrp${subdomainRecord}`, `rp.${POSTAL_DOMAIN}.`),
    TXT(rootRecord, "v=spf1 a mx include:spf.post.polaris.gdn ~all"),
    TXT(`_dmarc${subdomainRecord}`, "v=DMARC1; p=none"),
    ...dkimKeys.map((k) =>
      CNAME(
        `postal-${k}._domainkey${subdomainRecord}`,
        `_dk1.${POSTAL_DOMAIN}.`
      )
    ),
  ];
}

export function CreatePostalServiceRecords(): DNSControlRecord[] {
  return [
    A("mx.post", "104.37.168.87"),
    A("post", "104.37.168.87"),
    A("track", "104.37.168.87"),
    MX("routes.post", 10, `${POSTAL_DOMAIN}.`),
    MX("rp.post", 10, `${POSTAL_DOMAIN}.`),
    TXT("rp.post", "v=spf1 a mx include:spf.post.polaris.gdn ~all"),
    CNAME("postal._domainkey.rp.post", `dk1._domainkey.${POSTAL_DOMAIN}.`),

    // Pre-defined records
    TXT(
      "_dk1.post",
      "v=DKIM1; t=s; h=sha256; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+FS4EPKN7SJtNALxJl30bUZeq2pI0msw9B+XrwYme6cQLFBu8GTsNh8b8DkWJ11/mY/YigtCISQQYzQQwlotRrqfdVaXttxrIdeDWktsatlu0muQh9hYBdN2JCOxtI4DbDe5zCXXGMQVmfJ9rELDWDLPZitFNQG2+7hiJN2hYVwIDAQAB;"
    ),
  ];
}

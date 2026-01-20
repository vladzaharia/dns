/**
 * DNSControl DNS Record Types
 * All standard DNS record type functions
 *
 * @packageDocumentation
 */

/// <reference path="base.d.ts" />

// =============================================================================
// ADDRESS RECORDS
// =============================================================================

/**
 * A() adds an A record (IPv4 address).
 * @param name - Record name (use "@" for apex)
 * @param address - IPv4 address (string or IP() result)
 * @param modifiers - Record modifiers (TTL, etc.) or metadata objects
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/a
 */
declare function A(name: string, address: IpAddress, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

/**
 * AAAA() adds an AAAA record (IPv6 address).
 * @param name - Record name (use "@" for apex)
 * @param address - IPv6 address
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/aaaa
 */
declare function AAAA(name: string, address: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

// =============================================================================
// ALIAS/CNAME RECORDS
// =============================================================================

/**
 * ALIAS() adds an ALIAS record (ANAME/flattened CNAME at apex).
 * @param name - Record name (typically "@" for apex)
 * @param target - Target hostname (should end with "." for FQDN)
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/alias
 */
declare function ALIAS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

/**
 * CNAME() adds a CNAME record.
 * @param name - Record name (cannot be "@" for apex per RFC)
 * @param target - Target hostname (should end with "." for FQDN)
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cname
 */
declare function CNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

/**
 * DNAME() adds a DNAME record (delegation name for entire subtree).
 * @param name - Record name
 * @param target - Target domain (should end with "." for FQDN)
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/dname
 */
declare function DNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

// =============================================================================
// MAIL RECORDS
// =============================================================================

/**
 * MX() adds an MX record (mail exchange).
 * @param name - Record name (use "@" for apex)
 * @param priority - Mail server priority (lower = higher priority)
 * @param target - Mail server hostname (should end with "." for FQDN)
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/mx
 */
declare function MX(name: string, priority: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

// =============================================================================
// NAMESERVER RECORDS
// =============================================================================

/**
 * NS() adds an NS record (nameserver delegation).
 * @param name - Record name (use "@" for apex, or subdomain for delegation)
 * @param target - Nameserver hostname (should end with "." for FQDN)
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/ns
 */
declare function NS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

// =============================================================================
// TEXT RECORDS
// =============================================================================

/**
 * TXT() adds a TXT record.
 * Long strings are automatically split into 255-byte chunks.
 * @param name - Record name (use "@" for apex)
 * @param contents - Text content (can be a single string or array for multiple strings)
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/txt
 */
declare function TXT(name: string, contents: string | string[], ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

// =============================================================================
// POINTER RECORDS
// =============================================================================

/**
 * PTR() adds a PTR record (reverse DNS).
 * @param name - Record name (typically the host portion of reverse zone)
 * @param target - Target hostname (should end with "." for FQDN)
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/ptr
 */
declare function PTR(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

// =============================================================================
// SERVICE RECORDS
// =============================================================================

/**
 * SRV() adds an SRV record (service location).
 * @param name - Service name (e.g., "_sip._tcp" or "_http._tcp.www")
 * @param priority - Priority (lower = higher priority)
 * @param weight - Weight for load balancing among same priority
 * @param port - Port number
 * @param target - Target hostname (should end with "." for FQDN)
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/srv
 */
declare function SRV(
  name: string,
  priority: number,
  weight: number,
  port: number,
  target: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/**
 * NAPTR() adds a NAPTR record (Naming Authority Pointer).
 * @param name - Record name
 * @param order - Order (lower processed first)
 * @param preference - Preference (lower preferred among same order)
 * @param flags - Flags (e.g., "U", "S", "A", "P")
 * @param service - Service (e.g., "SIP+D2U", "E2U+sip")
 * @param regexp - Regular expression for rewriting
 * @param target - Replacement target (should end with "." for FQDN)
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/naptr
 */
declare function NAPTR(
  name: string,
  order: number,
  preference: number,
  flags: string,
  service: NaptrService,
  regexp: string,
  target: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

// =============================================================================
// SVCB/HTTPS RECORDS (Service Binding)
// =============================================================================

/**
 * SVCB() adds an SVCB record (Service Binding).
 * @param name - Record name
 * @param priority - Priority (0 for alias mode)
 * @param target - Target hostname (should end with "." for FQDN, or "." for self)
 * @param params - Service parameters (e.g., "alpn=h2,h3 port=8443")
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/svcb
 */
declare function SVCB(
  name: string,
  priority: number,
  target: string,
  params?: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/**
 * HTTPS() adds an HTTPS record (SVCB for HTTPS service).
 * @param name - Record name
 * @param priority - Priority (0 for alias mode)
 * @param target - Target hostname (should end with "." for FQDN, or "." for self)
 * @param params - Service parameters (e.g., "alpn=h2,h3")
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/https
 */
declare function HTTPS(
  name: string,
  priority: number,
  target: string,
  params?: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

// =============================================================================
// SECURITY RECORDS
// =============================================================================

/**
 * CAA() adds a CAA record (Certificate Authority Authorization).
 * @param name - Record name (use "@" for apex)
 * @param tag - CAA tag type
 * @param value - Tag value (e.g., "letsencrypt.org")
 * @param modifiers - Record modifiers (including CAA_CRITICAL)
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/caa
 */
declare function CAA(
  name: string,
  tag: CaaTag | string,
  value: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/**
 * TLSA() adds a TLSA record (TLS Authentication).
 * @param name - Record name (typically "_port._protocol.host")
 * @param usage - Certificate usage (0-3)
 * @param selector - Selector (0=full cert, 1=SubjectPublicKeyInfo)
 * @param matchingType - Matching type (0=exact, 1=SHA-256, 2=SHA-512)
 * @param certificate - Certificate data (hex-encoded hash or full cert)
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/tlsa
 */
declare function TLSA(
  name: string,
  usage: TlsaCertUsage,
  selector: TlsaSelector,
  matchingType: TlsaMatchingType,
  certificate: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/**
 * SSHFP() adds an SSHFP record (SSH Fingerprint).
 * @param name - Record name (typically "@" or hostname)
 * @param algorithm - SSH algorithm (1=RSA, 2=DSA, 3=ECDSA, 4=Ed25519, 6=Ed448)
 * @param fingerprintType - Hash type (1=SHA-1, 2=SHA-256)
 * @param fingerprint - Hex-encoded fingerprint
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/sshfp
 */
declare function SSHFP(
  name: string,
  algorithm: SshfpAlgorithm,
  fingerprintType: SshfpFingerprintType,
  fingerprint: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/**
 * SMIMEA() adds an SMIMEA record (S/MIME Certificate Association).
 * @param name - Record name (hash of email local-part)
 * @param usage - Certificate usage (0-3, same as TLSA)
 * @param selector - Selector (0=full cert, 1=SubjectPublicKeyInfo)
 * @param matchingType - Matching type (0=exact, 1=SHA-256, 2=SHA-512)
 * @param certificate - Certificate data (hex-encoded)
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/smimea
 */
declare function SMIMEA(
  name: string,
  usage: TlsaCertUsage,
  selector: TlsaSelector,
  matchingType: TlsaMatchingType,
  certificate: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/**
 * OPENPGPKEY() adds an OPENPGPKEY record (OpenPGP public key).
 * @param name - Record name (hash of email local-part)
 * @param publicKey - Base64-encoded OpenPGP public key
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/openpgpkey
 */
declare function OPENPGPKEY(
  name: string,
  publicKey: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

// =============================================================================
// DNSSEC RECORDS
// =============================================================================

/**
 * DNSKEY() adds a DNSKEY record (DNSSEC public key).
 * @param name - Record name (typically "@")
 * @param flags - Key flags (256=ZSK, 257=KSK)
 * @param protocol - Protocol (always 3)
 * @param algorithm - DNSSEC algorithm number
 * @param publicKey - Base64-encoded public key
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/dnskey
 */
declare function DNSKEY(
  name: string,
  flags: 256 | 257 | number,
  protocol: 3 | number,
  algorithm: DnssecAlgorithm | number,
  publicKey: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/**
 * DS() adds a DS record (Delegation Signer for DNSSEC).
 * @param name - Record name (subdomain being delegated)
 * @param keyTag - Key tag (identifier for the DNSKEY)
 * @param algorithm - DNSSEC algorithm number
 * @param digestType - Digest type (1=SHA-1, 2=SHA-256, 4=SHA-384)
 * @param digest - Hex-encoded digest of DNSKEY
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/ds
 */
declare function DS(
  name: string,
  keyTag: number,
  algorithm: DnssecAlgorithm | number,
  digestType: DnssecDigestType | number,
  digest: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

// =============================================================================
// MISCELLANEOUS RECORDS
// =============================================================================

/**
 * LOC() adds a LOC record (geographic location).
 * @param name - Record name
 * @param d1 - Latitude degrees
 * @param m1 - Latitude minutes
 * @param s1 - Latitude seconds
 * @param ns - "N" or "S"
 * @param d2 - Longitude degrees
 * @param m2 - Longitude minutes
 * @param s2 - Longitude seconds
 * @param ew - "E" or "W"
 * @param alt - Altitude in meters
 * @param siz - Size in meters (optional)
 * @param hp - Horizontal precision in meters (optional)
 * @param vp - Vertical precision in meters (optional)
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/loc
 */
declare function LOC(
  name: string,
  d1: number,
  m1: number,
  s1: number,
  ns: LatitudeDirection,
  d2: number,
  m2: number,
  s2: number,
  ew: LongitudeDirection,
  alt: number,
  siz?: number,
  hp?: number,
  vp?: number,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/**
 * DHCID() adds a DHCID record (DHCP Identifier).
 * @param name - Record name
 * @param digest - DHCID digest (base64 encoded)
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/dhcid
 */
declare function DHCID(name: string, digest: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

/**
 * RP() adds an RP record (Responsible Person).
 * @param name - Record name
 * @param mbox - Email address in DNS format (e.g., "admin.example.com.")
 * @param txt - Hostname with TXT record containing more info (should end with ".")
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/rp
 */
declare function RP(
  name: string,
  mbox: string,
  txt: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/**
 * SOA() adds/modifies the SOA record.
 * Note: Most providers handle SOA automatically.
 * @param name - Record name (typically "@")
 * @param ns - Primary nameserver
 * @param mbox - Responsible party email in DNS format
 * @param serial - Zone serial number
 * @param refresh - Refresh interval
 * @param retry - Retry interval
 * @param expire - Expire time
 * @param minttl - Minimum TTL / negative caching TTL
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/soa
 */
declare function SOA(
  name: string,
  ns: string,
  mbox: string,
  serial: number,
  refresh: number,
  retry: number,
  expire: number,
  minttl: number,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

// =============================================================================
// PSEUDO-RECORDS (Provider-specific redirect records)
// =============================================================================

/**
 * FRAME() adds a frame/masking redirect (provider-specific).
 * @param name - Record name
 * @param target - Target URL
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/frame
 */
declare function FRAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

/**
 * URL() adds a 302 redirect (provider-specific).
 * @param name - Record name
 * @param target - Target URL
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/url
 */
declare function URL(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

/**
 * URL301() adds a 301 permanent redirect (provider-specific).
 * @param name - Record name
 * @param target - Target URL
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/url301
 */
declare function URL301(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

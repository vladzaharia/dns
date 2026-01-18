/**
 * Core type definitions for DNS Infrastructure-as-Code
 */

// =============================================================================
// Server Types
// =============================================================================

/** Geographic location identifiers for servers */
export type ServerLocation = "sea" | "qnc" | "re" | "local";

/** Server name identifiers */
export type ServerName =
  | "greenwood"
  | "caphill"
  | "pangolin"
  | "upvpn"
  | "reprise1"
  | "reprise2"
  | "reprise3"
  | "reprise4"
  | "local-traefik";

/** Server definition */
export interface Server {
  readonly name: ServerName;
  readonly location: ServerLocation;
  readonly prefix: string;
  readonly hostname: string;
  readonly ip: string;
  readonly ipv6?: string;
  readonly isDDNS?: boolean;
}

/** Server registry type */
export type ServerRegistry = Record<ServerName, Server>;

// =============================================================================
// DNS Record Types
// =============================================================================

/** Supported DNS record types */
export type RecordType = "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "SRV" | "CAA" | "NS";

/** Cloudflare proxy status */
export type ProxyStatus = "on" | "off" | "full";

/** Record options for DNS records */
export interface RecordOptions {
  /** Cloudflare proxy status */
  proxy?: ProxyStatus;
  /** TTL in seconds (1 = auto for Cloudflare) */
  ttl?: number;
  /** Priority for MX records */
  priority?: number;
}

/** Base DNS record interface */
export interface DNSRecord {
  readonly type: RecordType;
  readonly name: string;
  readonly target: string;
  readonly options?: RecordOptions;
}

/** A record */
export interface ARecord extends DNSRecord {
  readonly type: "A";
}

/** AAAA record */
export interface AAAARecord extends DNSRecord {
  readonly type: "AAAA";
}

/** CNAME record */
export interface CNAMERecord extends DNSRecord {
  readonly type: "CNAME";
}

/** MX record */
export interface MXRecord extends DNSRecord {
  readonly type: "MX";
  readonly priority: number;
}

/** TXT record */
export interface TXTRecord extends DNSRecord {
  readonly type: "TXT";
}

/** SRV record */
export interface SRVRecord extends DNSRecord {
  readonly type: "SRV";
  readonly priority: number;
  readonly weight: number;
  readonly port: number;
}

/** CAA record */
export interface CAARecord extends DNSRecord {
  readonly type: "CAA";
  readonly flags: number;
  readonly tag: "issue" | "issuewild" | "iodef";
}

// =============================================================================
// Service Types
// =============================================================================

/** Routing strategy for services */
export type RoutingStrategy = "direct" | "tunnel" | "proxied";

/** Service definition */
export interface Service {
  readonly name: string;
  readonly subdomain: string;
  readonly server: ServerName;
  readonly routing: RoutingStrategy;
  /** Whether this is an internal-only service (.local or .int suffix) */
  readonly internal?: boolean;
  /** Custom suffix for internal services */
  readonly internalSuffix?: string;
}

/** Service category */
export type ServiceCategory =
  | "infrastructure"
  | "productivity"
  | "media"
  | "gaming"
  | "homelab"
  | "internal";

// =============================================================================
// Domain Types
// =============================================================================

/** Domain category */
export type DomainCategory = "personal" | "infrastructure" | "services" | "local";

/** Domain configuration */
export interface DomainConfig {
  readonly name: string;
  readonly category: DomainCategory;
  readonly registrar: string;
  readonly dnsProvider: string;
}

// =============================================================================
// Mail Provider Types
// =============================================================================

/** Mail provider type */
export type MailProvider = "fastmail" | "postal" | "none";

/** Fastmail configuration */
export interface FastmailConfig {
  readonly provider: "fastmail";
  readonly domain: string;
  readonly includeSubdomainMail?: boolean;
}

/** Postal configuration */
export interface PostalConfig {
  readonly provider: "postal";
  readonly domain: string;
  readonly postalHostname: string;
  readonly returnPath: string;
  readonly dkimKey: string;
}

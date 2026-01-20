/**
 * Builder Configuration Zod Schemas
 *
 * These schemas validate configuration objects for DNSControl builder functions
 * like SPF_BUILDER, DMARC_BUILDER, CAA_BUILDER, etc.
 *
 * @packageDocumentation
 */

import { z } from "zod";
import { TtlSchema } from "./base.js";

// =============================================================================
// CAA BUILDER
// =============================================================================

/**
 * CAA Builder configuration schema
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/caa_builder
 */
export const CaaBuilderConfigSchema = z.object({
  /** Record name (default: "@") */
  label: z.string().optional(),
  /** CA domains authorized for standard certificates */
  issue: z.array(z.string()).optional(),
  /** CA domains authorized for wildcard certificates */
  issuewild: z.array(z.string()).optional(),
  /** URLs for violation reports */
  iodef: z.array(z.string().url()).optional(),
  /** Contact email addresses */
  iodef_email: z.array(z.string().email()).optional(),
  /** Set critical flag on all records */
  critical: z.boolean().optional(),
  /** TTL for CAA records */
  ttl: TtlSchema.optional(),
});
export type CaaBuilderConfig = z.infer<typeof CaaBuilderConfigSchema>;

// =============================================================================
// DKIM BUILDER
// =============================================================================

/**
 * DKIM Builder configuration schema
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/dkim_builder
 */
export const DkimBuilderConfigSchema = z.object({
  /** DKIM selector (e.g., "selector1", "google") */
  selector: z.string().min(1),
  /** Public key (base64 encoded, can span multiple lines) */
  key: z.string().min(1),
  /** Record name label (default: constructs from selector + "_domainkey") */
  label: z.string().optional(),
  /** Hash algorithm (default: "sha256") */
  hash: z.enum(["sha1", "sha256"]).optional(),
  /** Key type (default: "rsa") */
  keyType: z.enum(["rsa", "ed25519"]).optional(),
  /** Flags (e.g., "y" for testing) */
  flags: z.string().optional(),
  /** Service type (default: "*" for all) */
  serviceType: z.string().optional(),
  /** Notes/comments */
  notes: z.string().optional(),
  /** TTL for DKIM record */
  ttl: TtlSchema.optional(),
});
export type DkimBuilderConfig = z.infer<typeof DkimBuilderConfigSchema>;

// =============================================================================
// DMARC BUILDER
// =============================================================================

/**
 * DMARC policy values
 */
export const DmarcPolicySchema = z.enum(["none", "quarantine", "reject"]);
export type DmarcPolicy = z.infer<typeof DmarcPolicySchema>;

/**
 * DMARC alignment mode
 */
export const DmarcAlignmentSchema = z.enum(["r", "s"]); // relaxed or strict
export type DmarcAlignment = z.infer<typeof DmarcAlignmentSchema>;

/**
 * DMARC Builder configuration schema
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/dmarc_builder
 */
export const DmarcBuilderConfigSchema = z.object({
  /** Record name label (default: "_dmarc") */
  label: z.string().optional(),
  /** DMARC version (default: "DMARC1") */
  version: z.string().optional(),
  /** Policy for domain (required) */
  policy: DmarcPolicySchema,
  /** Policy for subdomains */
  subdomainPolicy: DmarcPolicySchema.optional(),
  /** DKIM alignment mode */
  alignmentDKIM: DmarcAlignmentSchema.optional(),
  /** SPF alignment mode */
  alignmentSPF: DmarcAlignmentSchema.optional(),
  /** Percentage of messages to apply policy (0-100) */
  percent: z.number().int().min(0).max(100).optional(),
  /** Aggregate report URIs */
  rua: z.array(z.string()).optional(),
  /** Forensic report URIs */
  ruf: z.array(z.string()).optional(),
  /** Forensic report options */
  failureOptions: z.string().optional(),
  /** Report format (default: "afrf") */
  reportFormat: z.string().optional(),
  /** Report interval in seconds */
  reportInterval: z.number().int().positive().optional(),
  /** TTL for DMARC record */
  ttl: TtlSchema.optional(),
});
export type DmarcBuilderConfig = z.infer<typeof DmarcBuilderConfigSchema>;

// =============================================================================
// SPF BUILDER
// =============================================================================

/**
 * SPF Builder configuration schema
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/spf_builder
 */
export const SpfBuilderConfigSchema = z.object({
  /** Record name label (default: "@") */
  label: z.string().optional(),
  /** Overflow handling label for split records */
  overflow: z.string().optional(),
  /** Number of lookups to split record if exceeded */
  lookupLimit: z.number().int().positive().optional(),
  /** Parts of the SPF record */
  parts: z.array(z.string()).optional(),
  /** TTL for SPF record */
  ttl: TtlSchema.optional(),
  /** Flatten (resolve) includes */
  flatten: z.array(z.string()).optional(),
  /** Include mechanisms */
  include: z.array(z.string()).optional(),
  /** IPv4 addresses/ranges */
  ip4: z.array(z.string()).optional(),
  /** IPv6 addresses/ranges */
  ip6: z.array(z.string()).optional(),
  /** A record lookups */
  a: z.array(z.string()).optional(),
  /** MX record lookups */
  mx: z.array(z.string()).optional(),
  /** Policy qualifier for all mechanism (soft fail) */
  softfail: z.boolean().optional(),
  /** Hard fail for default */
  hardfail: z.boolean().optional(),
});
export type SpfBuilderConfig = z.infer<typeof SpfBuilderConfigSchema>;

// =============================================================================
// MICROSOFT 365 BUILDER
// =============================================================================

/**
 * M365 Builder configuration schema
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/m365_builder
 */
export const M365BuilderConfigSchema = z.object({
  /** Initial domain (e.g., "contoso" for contoso.onmicrosoft.com) */
  initialDomain: z.string().optional(),
  /** Tenant ID */
  tenantId: z.string().optional(),
  /** Enable Exchange Online */
  mx: z.boolean().optional(),
  /** Enable Autodiscover */
  autodiscover: z.boolean().optional(),
  /** Enable DKIM signing (requires selector) */
  dkim: z.boolean().optional(),
  /** DKIM selector 1 CNAME target */
  dkimSelector1: z.string().optional(),
  /** DKIM selector 2 CNAME target */
  dkimSelector2: z.string().optional(),
  /** Enable MDM (Mobile Device Management) */
  mdm: z.boolean().optional(),
  /** Enable Skype for Business / Teams */
  skypeForBusiness: z.boolean().optional(),
  /** Enable Intune */
  intune: z.boolean().optional(),
  /** Enable SPF include for Exchange Online */
  spf: z.boolean().optional(),
  /** TTL for all records */
  ttl: TtlSchema.optional(),
});
export type M365BuilderConfig = z.infer<typeof M365BuilderConfigSchema>;

// =============================================================================
// LOC BUILDERS
// =============================================================================

/**
 * LOC Builder DD (Decimal Degrees) configuration schema
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/loc_builder_dd
 */
export const LocBuilderDDConfigSchema = z.object({
  /** Record name */
  label: z.string(),
  /** Latitude in decimal degrees (positive = N, negative = S) */
  lat: z.number().min(-90).max(90),
  /** Longitude in decimal degrees (positive = E, negative = W) */
  lon: z.number().min(-180).max(180),
  /** Altitude in meters */
  alt: z.number().optional(),
  /** Size in meters */
  siz: z.number().positive().optional(),
  /** Horizontal precision in meters */
  hp: z.number().positive().optional(),
  /** Vertical precision in meters */
  vp: z.number().positive().optional(),
  /** TTL */
  ttl: TtlSchema.optional(),
});
export type LocBuilderDDConfig = z.infer<typeof LocBuilderDDConfigSchema>;

/**
 * LOC Builder string configuration (for DMM_STR, DMS_STR, STR variants)
 */
export const LocBuilderStrConfigSchema = z.object({
  /** Record name */
  label: z.string(),
  /** Location string in various formats */
  str: z.string(),
  /** Altitude in meters */
  alt: z.number().optional(),
  /** TTL */
  ttl: TtlSchema.optional(),
});
export type LocBuilderStrConfig = z.infer<typeof LocBuilderStrConfigSchema>;

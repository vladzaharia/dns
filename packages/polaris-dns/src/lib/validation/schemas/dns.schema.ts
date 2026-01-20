/**
 * DNS validation schemas for polaris-dns
 *
 * Re-exports schemas from @vladzaharia/dnscontrol-types and adds
 * polaris-specific extensions like ProxyStatus for Cloudflare integration.
 */

import { z } from "zod";
import { Ipv4AddressSchema, Ipv6AddressSchema } from "@vladzaharia/dnscontrol-types";

// =============================================================================
// RE-EXPORTS FROM DNSCONTROL-TYPES
// =============================================================================

// Primitive schemas
export {
  TtlSchema,
  type Ttl,
  IpAddressSchema,
  type IpAddress,
  Ipv4AddressSchema,
  type Ipv4Address,
  Ipv6AddressSchema,
  type Ipv6Address,
} from "@vladzaharia/dnscontrol-types";

// DNS validation schemas
export {
  DnsLabelSchema,
  type DnsLabel,
  FqdnSchema,
  type Fqdn,
  DomainNameSchema,
  type DomainName,
  RecordNameSchema,
  type RecordName,
  HostnameSchema,
  type Hostname,
  PortSchema,
  type Port,
  PrioritySchema,
  type Priority,
  WeightSchema,
  type Weight,
  TxtContentSchema,
  type TxtContent,
} from "@vladzaharia/dnscontrol-types";

// CAA types
export { CaaTagSchema, type CaaTag } from "@vladzaharia/dnscontrol-types";

// Record schemas from dnscontrol-types
export {
  ARecordSchema as BaseARecordSchema,
  AAAARecordSchema as BaseAAAARecordSchema,
  CnameRecordSchema as BaseCnameRecordSchema,
  MxRecordSchema,
  type MxRecord,
  NsRecordSchema,
  type NsRecord,
  TxtRecordSchema,
  type TxtRecord,
  PtrRecordSchema,
  type PtrRecord,
  SrvRecordSchema,
  type SrvRecord,
  CaaRecordSchema,
  type CaaRecord,
  DnsRecordSchema as BaseDnsRecordSchema,
} from "@vladzaharia/dnscontrol-types";

// =============================================================================
// POLARIS-SPECIFIC EXTENSIONS
// =============================================================================

/**
 * Cloudflare proxy status
 * - "on": Proxied through Cloudflare (orange cloud)
 * - "off": DNS only (gray cloud)
 * - "full": Full SSL mode
 */
export const ProxyStatusSchema = z.enum(["on", "off", "full"]);
export type ProxyStatus = z.infer<typeof ProxyStatusSchema>;

/**
 * Record options for polaris-dns records
 * Extends base record options with Cloudflare-specific fields
 */
export const RecordOptionsSchema = z.object({
  proxy: ProxyStatusSchema.optional(),
  ttl: z.number().int().min(1).optional(),
  priority: z.number().int().min(0).max(65535).optional(),
});
export type RecordOptions = z.infer<typeof RecordOptionsSchema>;

/**
 * Extended A record schema with Cloudflare proxy support
 * Uses 'ip' field name for compatibility with polaris-dns conventions
 */
export const ARecordSchema = z.object({
  type: z.literal("A").optional(),
  name: z.string().min(1).max(253),
  ip: Ipv4AddressSchema,
  ttl: z.number().int().min(1).optional(),
  proxy: ProxyStatusSchema.optional(),
});
export type ARecord = z.infer<typeof ARecordSchema>;

/**
 * Extended AAAA record schema with Cloudflare proxy support
 */
export const AAAARecordSchema = z.object({
  type: z.literal("AAAA").optional(),
  name: z.string().min(1).max(253),
  ip: Ipv6AddressSchema,
  ttl: z.number().int().min(1).optional(),
  proxy: ProxyStatusSchema.optional(),
});
export type AAAARecord = z.infer<typeof AAAARecordSchema>;

/**
 * Extended CNAME record schema with Cloudflare proxy support
 */
export const CnameRecordSchema = z.object({
  type: z.literal("CNAME").optional(),
  name: z.string().min(1).max(253),
  target: z.string().min(1),
  ttl: z.number().int().min(1).optional(),
  proxy: ProxyStatusSchema.optional(),
});
export type CnameRecord = z.infer<typeof CnameRecordSchema>;

/**
 * Union of all polaris-dns record types
 */
export const PolarisRecordSchema = z.discriminatedUnion("type", [
  ARecordSchema.extend({ type: z.literal("A") }),
  AAAARecordSchema.extend({ type: z.literal("AAAA") }),
  CnameRecordSchema.extend({ type: z.literal("CNAME") }),
]);
export type PolarisRecord = z.infer<typeof PolarisRecordSchema>;

/**
 * DNS Record Zod Schemas
 *
 * These schemas validate DNS record configurations for use with DNSControl.
 * Each schema corresponds to a record type function in DNSControl DSL.
 *
 * @packageDocumentation
 */

import { z } from 'zod';
import {
  TtlSchema,
  IpAddressSchema,
  Ipv6AddressSchema,
  CaaTagSchema,
  TlsaCertUsageSchema,
  TlsaSelectorSchema,
  TlsaMatchingTypeSchema,
  SshfpAlgorithmSchema,
  SshfpFingerprintTypeSchema,
  DnssecAlgorithmSchema,
  DnssecDigestTypeSchema,
  LatitudeDirectionSchema,
  LongitudeDirectionSchema,
  RecordMetaSchema,
} from './base.js';
import {
  RecordNameSchema,
  HostnameSchema,
  PrioritySchema,
  WeightSchema,
  PortSchema,
  TxtContentSchema,
  HexStringSchema,
  Base64StringSchema,
} from './dns.js';

// =============================================================================
// BASE RECORD SCHEMA
// =============================================================================

/**
 * Base schema for all DNS records
 */
const BaseRecordSchema = z.object({
  name: RecordNameSchema,
  ttl: TtlSchema.optional(),
  meta: RecordMetaSchema.optional(),
});

// =============================================================================
// ADDRESS RECORDS
// =============================================================================

/**
 * A record schema (IPv4 address)
 */
export const ARecordSchema = BaseRecordSchema.extend({
  type: z.literal('A').default('A'),
  address: IpAddressSchema,
});
export type ARecord = z.infer<typeof ARecordSchema>;

/**
 * AAAA record schema (IPv6 address)
 */
export const AAAARecordSchema = BaseRecordSchema.extend({
  type: z.literal('AAAA').default('AAAA'),
  address: Ipv6AddressSchema,
});
export type AAAARecord = z.infer<typeof AAAARecordSchema>;

// =============================================================================
// ALIAS/CNAME RECORDS
// =============================================================================

/**
 * ALIAS record schema (ANAME/flattened CNAME at apex)
 */
export const AliasRecordSchema = BaseRecordSchema.extend({
  type: z.literal('ALIAS').default('ALIAS'),
  target: HostnameSchema,
});
export type AliasRecord = z.infer<typeof AliasRecordSchema>;

/**
 * CNAME record schema
 */
export const CnameRecordSchema = BaseRecordSchema.extend({
  type: z.literal('CNAME').default('CNAME'),
  target: HostnameSchema,
});
export type CnameRecord = z.infer<typeof CnameRecordSchema>;

/**
 * DNAME record schema (delegation name for entire subtree)
 */
export const DnameRecordSchema = BaseRecordSchema.extend({
  type: z.literal('DNAME').default('DNAME'),
  target: HostnameSchema,
});
export type DnameRecord = z.infer<typeof DnameRecordSchema>;

// =============================================================================
// MAIL RECORDS
// =============================================================================

/**
 * MX record schema (mail exchange)
 */
export const MxRecordSchema = BaseRecordSchema.extend({
  type: z.literal('MX').default('MX'),
  priority: PrioritySchema,
  target: HostnameSchema,
});
export type MxRecord = z.infer<typeof MxRecordSchema>;

// =============================================================================
// NAMESERVER RECORDS
// =============================================================================

/**
 * NS record schema (nameserver delegation)
 */
export const NsRecordSchema = BaseRecordSchema.extend({
  type: z.literal('NS').default('NS'),
  target: HostnameSchema,
});
export type NsRecord = z.infer<typeof NsRecordSchema>;

// =============================================================================
// TEXT RECORDS
// =============================================================================

/**
 * TXT record schema
 */
export const TxtRecordSchema = BaseRecordSchema.extend({
  type: z.literal('TXT').default('TXT'),
  content: TxtContentSchema,
});
export type TxtRecord = z.infer<typeof TxtRecordSchema>;

// =============================================================================
// POINTER RECORDS
// =============================================================================

/**
 * PTR record schema (reverse DNS)
 */
export const PtrRecordSchema = BaseRecordSchema.extend({
  type: z.literal('PTR').default('PTR'),
  target: HostnameSchema,
});
export type PtrRecord = z.infer<typeof PtrRecordSchema>;

// =============================================================================
// SERVICE RECORDS
// =============================================================================

/**
 * SRV record schema (service location)
 */
export const SrvRecordSchema = BaseRecordSchema.extend({
  type: z.literal('SRV').default('SRV'),
  priority: PrioritySchema,
  weight: WeightSchema,
  port: PortSchema,
  target: HostnameSchema,
});
export type SrvRecord = z.infer<typeof SrvRecordSchema>;

/**
 * NAPTR record schema (Naming Authority Pointer)
 */
export const NaptrRecordSchema = BaseRecordSchema.extend({
  type: z.literal('NAPTR').default('NAPTR'),
  order: z.number().int().min(0).max(65535),
  preference: z.number().int().min(0).max(65535),
  flags: z.string().max(255),
  service: z.string().max(255),
  regexp: z.string().max(255),
  replacement: HostnameSchema,
});
export type NaptrRecord = z.infer<typeof NaptrRecordSchema>;

// =============================================================================
// SVCB/HTTPS RECORDS
// =============================================================================

/**
 * SVCB record schema (Service Binding)
 */
export const SvcbRecordSchema = BaseRecordSchema.extend({
  type: z.literal('SVCB').default('SVCB'),
  priority: PrioritySchema,
  target: HostnameSchema,
  params: z.string().optional(),
});
export type SvcbRecord = z.infer<typeof SvcbRecordSchema>;

/**
 * HTTPS record schema (HTTPS service binding)
 */
export const HttpsRecordSchema = BaseRecordSchema.extend({
  type: z.literal('HTTPS').default('HTTPS'),
  priority: PrioritySchema,
  target: HostnameSchema,
  params: z.string().optional(),
});
export type HttpsRecord = z.infer<typeof HttpsRecordSchema>;

// =============================================================================
// SECURITY RECORDS
// =============================================================================

/**
 * CAA record schema (Certificate Authority Authorization)
 */
export const CaaRecordSchema = BaseRecordSchema.extend({
  type: z.literal('CAA').default('CAA'),
  tag: CaaTagSchema,
  value: z.string(),
  critical: z.boolean().optional(),
});
export type CaaRecord = z.infer<typeof CaaRecordSchema>;

/**
 * TLSA record schema (TLS Authentication)
 */
export const TlsaRecordSchema = BaseRecordSchema.extend({
  type: z.literal('TLSA').default('TLSA'),
  usage: TlsaCertUsageSchema,
  selector: TlsaSelectorSchema,
  matchingType: TlsaMatchingTypeSchema,
  certificate: HexStringSchema,
});
export type TlsaRecord = z.infer<typeof TlsaRecordSchema>;

/**
 * SSHFP record schema (SSH Fingerprint)
 */
export const SshfpRecordSchema = BaseRecordSchema.extend({
  type: z.literal('SSHFP').default('SSHFP'),
  algorithm: SshfpAlgorithmSchema,
  fingerprintType: SshfpFingerprintTypeSchema,
  fingerprint: HexStringSchema,
});
export type SshfpRecord = z.infer<typeof SshfpRecordSchema>;

/**
 * SMIMEA record schema (S/MIME Certificate Association)
 */
export const SmimeaRecordSchema = BaseRecordSchema.extend({
  type: z.literal('SMIMEA').default('SMIMEA'),
  usage: TlsaCertUsageSchema,
  selector: TlsaSelectorSchema,
  matchingType: TlsaMatchingTypeSchema,
  certificate: HexStringSchema,
});
export type SmimeaRecord = z.infer<typeof SmimeaRecordSchema>;

/**
 * OPENPGPKEY record schema (OpenPGP public key)
 */
export const OpenpgpkeyRecordSchema = BaseRecordSchema.extend({
  type: z.literal('OPENPGPKEY').default('OPENPGPKEY'),
  publicKey: Base64StringSchema,
});
export type OpenpgpkeyRecord = z.infer<typeof OpenpgpkeyRecordSchema>;

// =============================================================================
// DNSSEC RECORDS
// =============================================================================

/**
 * DNSKEY record schema (DNSSEC public key)
 */
export const DnskeyRecordSchema = BaseRecordSchema.extend({
  type: z.literal('DNSKEY').default('DNSKEY'),
  flags: z.union([z.literal(256), z.literal(257), z.number().int()]),
  protocol: z.union([z.literal(3), z.number().int()]),
  algorithm: z.union([DnssecAlgorithmSchema, z.number().int()]),
  publicKey: Base64StringSchema,
});
export type DnskeyRecord = z.infer<typeof DnskeyRecordSchema>;

/**
 * DS record schema (Delegation Signer for DNSSEC)
 */
export const DsRecordSchema = BaseRecordSchema.extend({
  type: z.literal('DS').default('DS'),
  keyTag: z.number().int().min(0).max(65535),
  algorithm: z.union([DnssecAlgorithmSchema, z.number().int()]),
  digestType: z.union([DnssecDigestTypeSchema, z.number().int()]),
  digest: HexStringSchema,
});
export type DsRecord = z.infer<typeof DsRecordSchema>;

// =============================================================================
// MISCELLANEOUS RECORDS
// =============================================================================

/**
 * LOC record schema (geographic location)
 */
export const LocRecordSchema = BaseRecordSchema.extend({
  type: z.literal('LOC').default('LOC'),
  latitude: z.object({
    degrees: z.number().int().min(0).max(90),
    minutes: z.number().int().min(0).max(59),
    seconds: z.number().min(0).max(59.999),
    direction: LatitudeDirectionSchema,
  }),
  longitude: z.object({
    degrees: z.number().int().min(0).max(180),
    minutes: z.number().int().min(0).max(59),
    seconds: z.number().min(0).max(59.999),
    direction: LongitudeDirectionSchema,
  }),
  altitude: z.number(),
  size: z.number().optional(),
  horizontalPrecision: z.number().optional(),
  verticalPrecision: z.number().optional(),
});
export type LocRecord = z.infer<typeof LocRecordSchema>;

/**
 * RP record schema (Responsible Person)
 */
export const RpRecordSchema = BaseRecordSchema.extend({
  type: z.literal('RP').default('RP'),
  mbox: HostnameSchema,
  txt: HostnameSchema,
});
export type RpRecord = z.infer<typeof RpRecordSchema>;

/**
 * DHCID record schema (DHCP Identifier)
 */
export const DhcidRecordSchema = BaseRecordSchema.extend({
  type: z.literal('DHCID').default('DHCID'),
  digest: Base64StringSchema,
});
export type DhcidRecord = z.infer<typeof DhcidRecordSchema>;

// =============================================================================
// PSEUDO-RECORDS
// =============================================================================

/**
 * URL record schema (302 redirect)
 */
export const UrlRecordSchema = BaseRecordSchema.extend({
  type: z.literal('URL').default('URL'),
  target: z.string().url(),
});
export type UrlRecord = z.infer<typeof UrlRecordSchema>;

/**
 * URL301 record schema (301 permanent redirect)
 */
export const Url301RecordSchema = BaseRecordSchema.extend({
  type: z.literal('URL301').default('URL301'),
  target: z.string().url(),
});
export type Url301Record = z.infer<typeof Url301RecordSchema>;

/**
 * FRAME record schema (frame/masking redirect)
 */
export const FrameRecordSchema = BaseRecordSchema.extend({
  type: z.literal('FRAME').default('FRAME'),
  target: z.string().url(),
});
export type FrameRecord = z.infer<typeof FrameRecordSchema>;

// =============================================================================
// UNION OF ALL RECORD TYPES
// =============================================================================

/**
 * Union of all DNS record schemas
 */
export const DnsRecordSchema = z.discriminatedUnion('type', [
  ARecordSchema.required({ type: true }),
  AAAARecordSchema.required({ type: true }),
  AliasRecordSchema.required({ type: true }),
  CnameRecordSchema.required({ type: true }),
  DnameRecordSchema.required({ type: true }),
  MxRecordSchema.required({ type: true }),
  NsRecordSchema.required({ type: true }),
  TxtRecordSchema.required({ type: true }),
  PtrRecordSchema.required({ type: true }),
  SrvRecordSchema.required({ type: true }),
  NaptrRecordSchema.required({ type: true }),
  SvcbRecordSchema.required({ type: true }),
  HttpsRecordSchema.required({ type: true }),
  CaaRecordSchema.required({ type: true }),
  TlsaRecordSchema.required({ type: true }),
  SshfpRecordSchema.required({ type: true }),
  SmimeaRecordSchema.required({ type: true }),
  OpenpgpkeyRecordSchema.required({ type: true }),
  DnskeyRecordSchema.required({ type: true }),
  DsRecordSchema.required({ type: true }),
  LocRecordSchema.required({ type: true }),
  RpRecordSchema.required({ type: true }),
  DhcidRecordSchema.required({ type: true }),
  UrlRecordSchema.required({ type: true }),
  Url301RecordSchema.required({ type: true }),
  FrameRecordSchema.required({ type: true }),
]);
export type DnsRecord = z.infer<typeof DnsRecordSchema>;


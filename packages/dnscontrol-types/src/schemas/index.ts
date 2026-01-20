/**
 * DNSControl Zod Schemas
 *
 * This module exports all Zod schemas for validating DNSControl configurations.
 *
 * @example
 * ```typescript
 * import { schemas } from '@vladzaharia/dnscontrol-types';
 *
 * // Validate an A record
 * const result = schemas.ARecordSchema.safeParse({
 *   name: '@',
 *   address: '192.0.2.1',
 *   ttl: 300
 * });
 *
 * if (result.success) {
 *   console.log('Valid record:', result.data);
 * } else {
 *   console.error('Validation errors:', result.error.issues);
 * }
 * ```
 *
 * @packageDocumentation
 */

// Base schemas
export {
  // Primitive types
  TtlSchema,
  type Ttl,
  IpAddressSchema,
  type IpAddress,
  Ipv4AddressSchema,
  type Ipv4Address,
  Ipv6AddressSchema,
  type Ipv6Address,

  // DNSSEC types
  DnssecAlgorithmSchema,
  type DnssecAlgorithm,
  DnssecDigestTypeSchema,
  type DnssecDigestType,

  // CAA types
  CaaTagSchema,
  type CaaTag,

  // TLSA types
  TlsaCertUsageSchema,
  type TlsaCertUsage,
  TlsaSelectorSchema,
  type TlsaSelector,
  TlsaMatchingTypeSchema,
  type TlsaMatchingType,

  // SSHFP types
  SshfpAlgorithmSchema,
  type SshfpAlgorithm,
  SshfpFingerprintTypeSchema,
  type SshfpFingerprintType,

  // Location types
  LatitudeDirectionSchema,
  type LatitudeDirection,
  LongitudeDirectionSchema,
  type LongitudeDirection,

  // Metadata types
  ProviderMetaSchema,
  type ProviderMeta,
  RecordMetaSchema,
  type RecordMeta,

  // Record type enums
  StandardRecordTypeSchema,
  type StandardRecordType,
  ExtendedRecordTypeSchema,
  type ExtendedRecordType,
  PseudoRecordTypeSchema,
  type PseudoRecordType,
  AllRecordTypesSchema,
  type AllRecordTypes,
} from "./base.js";

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
  HexStringSchema,
  type HexString,
  Base64StringSchema,
  type Base64String,
} from "./dns.js";

// Record schemas
export {
  ARecordSchema,
  type ARecord,
  AAAARecordSchema,
  type AAAARecord,
  AliasRecordSchema,
  type AliasRecord,
  CnameRecordSchema,
  type CnameRecord,
  DnameRecordSchema,
  type DnameRecord,
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
  NaptrRecordSchema,
  type NaptrRecord,
  SvcbRecordSchema,
  type SvcbRecord,
  HttpsRecordSchema,
  type HttpsRecord,
  CaaRecordSchema,
  type CaaRecord,
  TlsaRecordSchema,
  type TlsaRecord,
  SshfpRecordSchema,
  type SshfpRecord,
  SmimeaRecordSchema,
  type SmimeaRecord,
  OpenpgpkeyRecordSchema,
  type OpenpgpkeyRecord,
  DnskeyRecordSchema,
  type DnskeyRecord,
  DsRecordSchema,
  type DsRecord,
  LocRecordSchema,
  type LocRecord,
  RpRecordSchema,
  type RpRecord,
  DhcidRecordSchema,
  type DhcidRecord,
  UrlRecordSchema,
  type UrlRecord,
  Url301RecordSchema,
  type Url301Record,
  FrameRecordSchema,
  type FrameRecord,
  DnsRecordSchema,
  type DnsRecord,
} from "./records.js";

// Builder configuration schemas
export {
  CaaBuilderConfigSchema,
  type CaaBuilderConfig,
  DkimBuilderConfigSchema,
  type DkimBuilderConfig,
  DmarcPolicySchema,
  type DmarcPolicy,
  DmarcAlignmentSchema,
  type DmarcAlignment,
  DmarcBuilderConfigSchema,
  type DmarcBuilderConfig,
  SpfBuilderConfigSchema,
  type SpfBuilderConfig,
  M365BuilderConfigSchema,
  type M365BuilderConfig,
  LocBuilderDDConfigSchema,
  type LocBuilderDDConfig,
  LocBuilderStrConfigSchema,
  type LocBuilderStrConfig,
} from "./builders.js";

// Domain configuration schemas
export {
  DnsProviderRefSchema,
  type DnsProviderRef,
  RegistrarRefSchema,
  type RegistrarRef,
  DomainConfigSchema,
  type DomainConfig,
  DnsProviderConfigSchema,
  type DnsProviderConfig,
  RegistrarConfigSchema,
  type RegistrarConfig,
  DefaultsConfigSchema,
  type DefaultsConfig,
  DnsControlConfigSchema,
  type DnsControlConfig,
} from "./domain.js";

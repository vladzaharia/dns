/**
 * Validation module for polaris-dns
 *
 * Provides comprehensive validation for DNS records, servers, services,
 * and configurations using Zod schemas from @vladzaharia/dnscontrol-types
 * with polaris-specific extensions.
 *
 * @example
 * ```typescript
 * import {
 *   validateServer,
 *   validateService,
 *   setValidationConfig,
 *   withValidationMode
 * } from '@vladzaharia/polaris-dns/validation';
 *
 * // Configure validation mode
 * setValidationConfig({ mode: 'strict' });
 *
 * // Validate a server
 * const result = validateServer({
 *   name: 'greenwood',
 *   location: 'sea',
 *   prefix: 'gw',
 *   hostname: 'greenwood.example.com',
 *   ip: '192.168.1.1'
 * });
 *
 * // Temporarily disable validation
 * withValidationMode('disabled', () => {
 *   // ... operations without validation
 * });
 * ```
 *
 * @packageDocumentation
 */

// =============================================================================
// ERROR CLASSES
// =============================================================================

export {
  ValidationError,
  RecordValidationError,
  ServerValidationError,
  ServiceValidationError,
  ConfigValidationError,
  isValidationError,
  isRecordValidationError,
  isServerValidationError,
  isServiceValidationError,
  isConfigValidationError,
} from "./errors.js";

// =============================================================================
// CONFIGURATION
// =============================================================================

export {
  type ValidationMode,
  type ValidationConfig,
  getValidationConfig,
  setValidationConfig,
  resetValidationConfig,
  withValidationMode,
  withValidationModeAsync,
  isValidationEnabled,
  shouldThrowOnError,
  shouldLogWarnings,
  logValidationWarning,
} from "./config.js";

// =============================================================================
// DNS SCHEMAS (from dnscontrol-types + polaris extensions)
// =============================================================================

export {
  // Primitives from dnscontrol-types
  TtlSchema,
  type Ttl,
  IpAddressSchema,
  type IpAddress,
  Ipv4AddressSchema,
  type Ipv4Address,
  Ipv6AddressSchema,
  type Ipv6Address,
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
  CaaTagSchema,
  type CaaTag,
  // Base record schemas from dnscontrol-types
  BaseARecordSchema,
  BaseAAAARecordSchema,
  BaseCnameRecordSchema,
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
  BaseDnsRecordSchema,
  // Polaris-specific extensions
  ProxyStatusSchema,
  type ProxyStatus,
  RecordOptionsSchema,
  type RecordOptions,
  ARecordSchema,
  type ARecord,
  AAAARecordSchema,
  type AAAARecord,
  CnameRecordSchema,
  type CnameRecord,
  PolarisRecordSchema,
  type PolarisRecord,
} from "./schemas/dns.schema.js";

// =============================================================================
// SERVER SCHEMAS
// =============================================================================

export {
  ServerLocationSchema,
  type ServerLocation,
  ServerNameSchema,
  type ServerName,
  ServerPrefixSchema,
  type ServerPrefix,
  ServerSchema,
  type Server,
  ServerRegistrySchema,
  type ServerRegistry,
  PartialServerSchema,
  type PartialServer,
  CreateServerInputSchema,
  type CreateServerInput,
} from "./schemas/server.schema.js";

// =============================================================================
// SERVICE SCHEMAS
// =============================================================================

export {
  RoutingStrategySchema,
  type RoutingStrategy,
  ServiceCategorySchema,
  type ServiceCategory,
  DomainCategorySchema,
  type DomainCategory,
  ServiceSchema,
  type Service,
  ServiceDefinitionSchema,
  type ServiceDefinition,
  PolarisDomainConfigSchema,
  type PolarisDomainConfig,
  MailProviderSchema,
  type MailProvider,
  FastmailConfigSchema,
  type FastmailConfig,
  PostalConfigSchema,
  type PostalConfig,
  MailConfigSchema,
  type MailConfig,
} from "./schemas/service.schema.js";

// =============================================================================
// RECORD VALIDATORS
// =============================================================================

export {
  type PolarisValidationResult,
  validateWithConfig,
  validateARecord,
  validateAAAARecord,
  validateCnameRecord,
  validateMxRecord,
  validateTxtRecord,
  validateCaaRecord,
  validateSrvRecord,
  validateTtl,
  validateIpAddress,
  validateDomainName,
  validateRecordName,
  validateHostname,
  formatErrors,
  getErrorSummary,
  type ValidationResult,
  type FormattedError,
} from "./validators/record.validator.js";

// =============================================================================
// SERVER VALIDATORS
// =============================================================================

export {
  type ServerValidationResult,
  validateServer,
  validateServerLocation,
  validateServerName,
  validateServerRegistry,
} from "./validators/server.validator.js";

// =============================================================================
// SERVICE VALIDATORS
// =============================================================================

export {
  type ServiceValidationResult,
  validateService,
  validateServiceDefinition,
  validateRoutingStrategy,
  validatePolarisDomainConfig,
  validateMailConfig,
} from "./validators/service.validator.js";

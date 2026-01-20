/**
 * Core library exports
 */

// Types
export * from "./types.js";

// Server utilities
export {
  servers,
  getServer,
  getServerIP,
  getServerHostname,
  getServerPrefix,
  isServerDDNS,
  getServersByLocation,
  getAllServerNames,
} from "./server.js";

// Record builders
export {
  createARecord,
  createAAAARecord,
  createCNAMERecord,
  createMXRecord,
  createTXTRecord,
  createSRVRecord,
  createCAARecord,
  createServiceRecord,
  createServerCNAME,
  createServerARecord,
} from "./record.js";
export type { ServiceRecordOptions } from "./record.js";

// Re-export for convenience
export { createSRVRecord as SRV } from "./record.js";

// Domain utilities
export {
  NO_REGISTRAR,
  CLOUDFLARE,
  createDomain,
  defineDomain,
  PERSONAL_DOMAINS,
  INFRASTRUCTURE_DOMAINS,
  SERVICE_DOMAINS,
  LOCAL_DOMAINS,
  ALL_DOMAINS,
} from "./domain.js";
export type { DomainBuilderOptions } from "./domain.js";

// =============================================================================
// VALIDATION MODULE
// =============================================================================
// Explicitly export to avoid conflicts with ./types.js exports

// Error classes
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
} from "./validation/errors.js";

// Configuration
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
} from "./validation/config.js";

// DNS Schemas (with polaris- prefix to avoid conflicts)
export {
  TtlSchema,
  IpAddressSchema,
  Ipv4AddressSchema,
  Ipv6AddressSchema,
  DnsLabelSchema,
  FqdnSchema,
  DomainNameSchema,
  RecordNameSchema,
  HostnameSchema,
  PortSchema,
  PrioritySchema,
  WeightSchema,
  TxtContentSchema,
  CaaTagSchema,
  BaseARecordSchema,
  BaseAAAARecordSchema,
  BaseCnameRecordSchema,
  MxRecordSchema,
  NsRecordSchema,
  TxtRecordSchema,
  PtrRecordSchema,
  SrvRecordSchema,
  CaaRecordSchema,
  BaseDnsRecordSchema,
  ProxyStatusSchema,
  RecordOptionsSchema,
  ARecordSchema,
  AAAARecordSchema,
  CnameRecordSchema,
  PolarisRecordSchema,
} from "./validation/schemas/dns.schema.js";

// DNS Schema Types (with Schema suffix to avoid conflicts)
export type {
  Ttl as TtlType,
  IpAddress as IpAddressType,
  Ipv4Address,
  Ipv6Address,
  DnsLabel,
  Fqdn,
  DomainName,
  RecordName,
  Hostname,
  Port,
  Priority,
  Weight,
  TxtContent,
  CaaTag,
  MxRecord,
  NsRecord,
  TxtRecord,
  PtrRecord,
  SrvRecord,
  CaaRecord,
  ProxyStatus as ProxyStatusValidated,
  RecordOptions as RecordOptionsValidated,
  ARecord as ARecordValidated,
  AAAARecord as AAAARecordValidated,
  CnameRecord,
  PolarisRecord,
} from "./validation/schemas/dns.schema.js";

// Server Schemas
export {
  ServerLocationSchema,
  ServerNameSchema,
  ServerPrefixSchema,
  ServerSchema,
  ServerRegistrySchema,
  PartialServerSchema,
  CreateServerInputSchema,
} from "./validation/schemas/server.schema.js";

// Server Schema Types (with Schema suffix to avoid conflicts)
export type {
  ServerLocation as ServerLocationValidated,
  ServerName as ServerNameValidated,
  ServerPrefix,
  Server as ServerValidated,
  ServerRegistry as ServerRegistryValidated,
  PartialServer,
  CreateServerInput,
} from "./validation/schemas/server.schema.js";

// Service Schemas
export {
  RoutingStrategySchema,
  ServiceCategorySchema,
  DomainCategorySchema,
  ServiceSchema,
  ServiceDefinitionSchema,
  PolarisDomainConfigSchema,
  MailProviderSchema,
  FastmailConfigSchema,
  PostalConfigSchema,
  MailConfigSchema,
} from "./validation/schemas/service.schema.js";

// Service Schema Types (with Schema suffix to avoid conflicts)
export type {
  RoutingStrategy as RoutingStrategyValidated,
  ServiceCategory as ServiceCategoryValidated,
  DomainCategory as DomainCategoryValidated,
  Service as ServiceValidated,
  ServiceDefinition,
  PolarisDomainConfig,
  MailProvider as MailProviderValidated,
  FastmailConfig as FastmailConfigValidated,
  PostalConfig as PostalConfigValidated,
  MailConfig,
} from "./validation/schemas/service.schema.js";

// Record validators
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
} from "./validation/validators/record.validator.js";

// Server validators
export {
  type ServerValidationResult,
  validateServer,
  validateServerLocation,
  validateServerName,
  validateServerRegistry,
} from "./validation/validators/server.validator.js";

// Service validators
export {
  type ServiceValidationResult,
  validateService,
  validateServiceDefinition,
  validateRoutingStrategy,
  validatePolarisDomainConfig,
  validateMailConfig,
} from "./validation/validators/service.validator.js";

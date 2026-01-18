/**
 * Zod schemas for DNS record validation
 * Provides runtime validation for all DNS record types
 *
 * This module re-exports schemas from the validation module and
 * @vladzaharia/dnscontrol-types for use in tests.
 */

import { z } from "zod";

// Re-export from dnscontrol-types via validation module
import {
  Ipv4AddressSchema,
  Ipv6AddressSchema,
  HostnameSchema,
  PortSchema,
  PrioritySchema,
  CaaTagSchema,
  ProxyStatusSchema,
} from "../../src/lib/validation/index.js";

// Re-export with test-friendly names (lowercase for consistency with existing tests)
export const ipv4Schema = Ipv4AddressSchema;
export const ipv6Schema = Ipv6AddressSchema;
export const hostnameSchema = HostnameSchema;
export const prioritySchema = PrioritySchema;
export const portSchema = PortSchema;
export const proxyStatusSchema = ProxyStatusSchema;
export const caaTagSchema = CaaTagSchema;

// DNS label (subdomain) validation - allows @, *, and standard labels including underscores
// This is more permissive than dnscontrol-types RecordNameSchema for test flexibility
export const dnsLabelSchema = z
  .string()
  .min(1)
  .max(63)
  .refine(
    (val) => {
      // Allow special labels
      if (val === "@" || val === "*") return true;
      // Allow labels starting with underscore (like _dmarc, _domainkey)
      if (val.startsWith("_")) return /^_[a-zA-Z0-9_.-]+$/.test(val);
      // Standard label validation
      return /^(?!-)[a-zA-Z0-9-]+(?<!-)$/.test(val);
    },
    { message: "Invalid DNS label" }
  );

// TTL validation (60 seconds to 1 day) - test-specific range
// Note: dnscontrol-types TtlSchema allows strings like "1h", this is numeric only
export const ttlSchema = z.number().int().min(60).max(86400);

// A Record schema (flexible - type is optional for validation tests)
export const aRecordSchema = z.object({
  type: z.literal("A").optional(),
  name: dnsLabelSchema,
  ip: ipv4Schema,
  ttl: ttlSchema.optional(),
  proxy: proxyStatusSchema.optional(),
});

// AAAA Record schema
export const aaaaRecordSchema = z.object({
  type: z.literal("AAAA").optional(),
  name: dnsLabelSchema,
  ip: ipv6Schema,
  ttl: ttlSchema.optional(),
  proxy: proxyStatusSchema.optional(),
});

// CNAME Record schema (target can end with . for FQDN)
export const cnameRecordSchema = z.object({
  type: z.literal("CNAME").optional(),
  name: dnsLabelSchema,
  target: z.string().min(1), // Allow FQDN with trailing dot
  ttl: ttlSchema.optional(),
  proxy: proxyStatusSchema.optional(),
});

// MX Record schema (target can end with . for FQDN)
export const mxRecordSchema = z.object({
  type: z.literal("MX").optional(),
  name: dnsLabelSchema,
  priority: prioritySchema,
  target: z.string().min(1), // Allow FQDN with trailing dot
  ttl: ttlSchema.optional(),
});

// TXT Record schema (name can include dots for DKIM selectors like selector._domainkey)
export const txtRecordSchema = z.object({
  type: z.literal("TXT").optional(),
  name: z.string().min(1).max(253), // Allow complex names like selector._domainkey
  content: z.string().min(1).max(4096),
  ttl: ttlSchema.optional(),
});

// SRV Record schema
export const srvRecordSchema = z.object({
  type: z.literal("SRV").optional(),
  name: z.string(), // SRV names have special format _service._proto
  priority: prioritySchema,
  weight: prioritySchema,
  port: portSchema,
  target: z.string().min(1), // Allow FQDN with trailing dot
  ttl: ttlSchema.optional(),
});

// CAA Record schema
export const caaRecordSchema = z.object({
  type: z.literal("CAA").optional(),
  name: dnsLabelSchema,
  flags: z.number().int().min(0).max(255).optional(),
  tag: caaTagSchema,
  value: z.string().min(1),
  ttl: ttlSchema.optional(),
});

// NS Record schema
export const nsRecordSchema = z.object({
  type: z.literal("NS"),
  name: dnsLabelSchema,
  target: hostnameSchema,
  ttl: ttlSchema.optional(),
});

// Union of all record types
export const dnsRecordSchema = z.discriminatedUnion("type", [
  aRecordSchema,
  aaaaRecordSchema,
  cnameRecordSchema,
  mxRecordSchema,
  txtRecordSchema,
  srvRecordSchema,
  caaRecordSchema,
  nsRecordSchema,
]);

// Type exports
export type ARecord = z.infer<typeof aRecordSchema>;
export type AAAARecord = z.infer<typeof aaaaRecordSchema>;
export type CNAMERecord = z.infer<typeof cnameRecordSchema>;
export type MXRecord = z.infer<typeof mxRecordSchema>;
export type TXTRecord = z.infer<typeof txtRecordSchema>;
export type SRVRecord = z.infer<typeof srvRecordSchema>;
export type CAARecord = z.infer<typeof caaRecordSchema>;
export type NSRecord = z.infer<typeof nsRecordSchema>;
export type DNSRecord = z.infer<typeof dnsRecordSchema>;

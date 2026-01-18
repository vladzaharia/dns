/**
 * Zod schemas for DNS record validation
 * Provides runtime validation for all DNS record types
 */

import { z } from "zod";
import { IPV4_REGEX, IPV6_REGEX, HOSTNAME_REGEX } from "../constants/dns-patterns.js";

// IPv4 address validation
export const ipv4Schema = z.string().regex(IPV4_REGEX, "Invalid IPv4 address");

// IPv6 address validation (comprehensive pattern)
export const ipv6Schema = z.string().regex(IPV6_REGEX, "Invalid IPv6 address");

// Hostname validation (RFC 1123)
export const hostnameSchema = z.string().min(1).max(253).regex(HOSTNAME_REGEX, "Invalid hostname");

// DNS label (subdomain) validation - allows @, *, and standard labels including underscores
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

// TTL validation (60 seconds to 1 day)
export const ttlSchema = z.number().int().min(60).max(86400);

// Priority validation (0-65535)
export const prioritySchema = z.number().int().min(0).max(65535);

// Port validation (1-65535, 0 is reserved)
export const portSchema = z.number().int().min(1).max(65535);

// Proxy status for Cloudflare
export const proxyStatusSchema = z.enum(["on", "off", "full"]);

// CAA tag validation
export const caaTagSchema = z.enum(["issue", "issuewild", "iodef"]);

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

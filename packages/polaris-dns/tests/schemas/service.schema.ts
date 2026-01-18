/**
 * Zod schemas for service validation
 * Validates service definitions and categories
 */

import { z } from "zod";
import { serverNameSchema } from "./server.schema.js";
import { dnsLabelSchema } from "./dns.schema.js";

// Routing strategy validation
export const routingStrategySchema = z.enum(["direct", "tunnel", "proxied"]);

// Service category validation
export const serviceCategorySchema = z.enum([
  "infrastructure",
  "productivity",
  "media",
  "gaming",
  "homelab",
  "internal",
]);

// Domain category validation
export const domainCategorySchema = z.enum(["personal", "infrastructure", "services", "local"]);

// Service definition schema
export const serviceSchema = z.object({
  name: z.string().min(1).max(100),
  subdomain: dnsLabelSchema,
  server: serverNameSchema,
  routing: routingStrategySchema,
  internal: z.boolean().optional(),
  internalSuffix: z.string().optional(),
});

// Service definition for services/types.ts format
export const serviceDefinitionSchema = z.object({
  name: z.string().min(1),
  subdomain: z.string().min(1),
  server: serverNameSchema,
  routing: routingStrategySchema,
  internal: z.boolean().optional(),
  internalSuffix: z.string().optional(),
});

// Domain configuration schema
export const domainConfigSchema = z.object({
  name: z.string().min(1).max(253),
  category: domainCategorySchema,
  registrar: z.string().min(1),
  dnsProvider: z.string().min(1),
});

// Mail provider validation
export const mailProviderSchema = z.enum(["fastmail", "postal", "none"]);

// Fastmail configuration schema
export const fastmailConfigSchema = z.object({
  provider: z.literal("fastmail"),
  domain: z.string().min(1),
  includeSubdomainMail: z.boolean().optional(),
});

// Postal configuration schema
export const postalConfigSchema = z.object({
  provider: z.literal("postal"),
  domain: z.string().min(1),
  postalHostname: z.string().min(1),
  returnPath: z.string().min(1),
  dkimKey: z.string().min(1),
});

// Record options schema
export const recordOptionsSchema = z.object({
  proxy: z.enum(["on", "off", "full"]).optional(),
  ttl: z.number().int().min(1).optional(),
  priority: z.number().int().min(0).max(65535).optional(),
});

// Type exports
export type RoutingStrategy = z.infer<typeof routingStrategySchema>;
export type ServiceCategory = z.infer<typeof serviceCategorySchema>;
export type DomainCategory = z.infer<typeof domainCategorySchema>;
export type Service = z.infer<typeof serviceSchema>;
export type ServiceDefinition = z.infer<typeof serviceDefinitionSchema>;
export type DomainConfig = z.infer<typeof domainConfigSchema>;
export type MailProvider = z.infer<typeof mailProviderSchema>;
export type FastmailConfig = z.infer<typeof fastmailConfigSchema>;
export type PostalConfig = z.infer<typeof postalConfigSchema>;
export type RecordOptions = z.infer<typeof recordOptionsSchema>;

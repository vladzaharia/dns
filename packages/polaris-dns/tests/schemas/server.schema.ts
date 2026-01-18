/**
 * Zod schemas for server validation
 * Validates server definitions and registry
 */

import { z } from "zod";
import { ipv4Schema, ipv6Schema, hostnameSchema } from "./dns.schema.js";

// Server location validation
export const serverLocationSchema = z.enum(["sea", "qnc", "re", "local"]);

// Server name validation
export const serverNameSchema = z.enum([
  "greenwood",
  "caphill",
  "pangolin",
  "upvpn",
  "reprise1",
  "reprise2",
  "reprise3",
  "reprise4",
  "local-traefik",
]);

// Server definition schema
export const serverSchema = z.object({
  name: serverNameSchema,
  location: serverLocationSchema,
  prefix: z.string().min(1).max(10),
  hostname: hostnameSchema,
  ip: ipv4Schema,
  ipv6: ipv6Schema.optional(),
  isDDNS: z.boolean().optional(),
});

// Server registry schema
export const serverRegistrySchema = z.record(serverNameSchema, serverSchema);

// Type exports
export type ServerLocation = z.infer<typeof serverLocationSchema>;
export type ServerName = z.infer<typeof serverNameSchema>;
export type Server = z.infer<typeof serverSchema>;
export type ServerRegistry = z.infer<typeof serverRegistrySchema>;

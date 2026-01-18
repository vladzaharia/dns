/**
 * Test data factories for DNS Record entities
 * Uses fishery and faker for generating realistic test data
 */

import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import type { ProxyStatus, RecordOptions } from "../../src/lib/types.js";
import { generateIPv4, generateIPv6 } from "./server.factory.js";

// Valid proxy statuses
const PROXY_STATUSES: ProxyStatus[] = ["on", "off", "full"];

// Valid CAA tags
const CAA_TAGS = ["issue", "issuewild", "iodef"] as const;

// Common certificate authorities for CAA records
const CERTIFICATE_AUTHORITIES = ["letsencrypt.org", "digicert.com", "sectigo.com", "comodoca.com"];

/**
 * Generate a valid DNS label (subdomain)
 */
function generateDnsLabel(): string {
  const labels = ["www", "api", "mail", "ftp", "cdn", "app", "dev", "staging", "prod", "@", "*"];
  return faker.helpers.arrayElement(labels);
}

/**
 * Generate a valid hostname
 */
function generateHostname(): string {
  return faker.internet.domainName();
}

/**
 * Generate valid TTL (60 seconds to 1 day)
 */
function generateTTL(): number {
  return faker.helpers.arrayElement([60, 300, 600, 1800, 3600, 7200, 14400, 43200, 86400]);
}

/**
 * Generate valid MX priority (0-65535, but typically 0-100)
 */
function generateMXPriority(): number {
  return faker.helpers.arrayElement([5, 10, 20, 30, 40, 50]);
}

/**
 * Record options factory
 */
export const recordOptionsFactory = Factory.define<RecordOptions>(() => ({
  proxy: faker.helpers.arrayElement(PROXY_STATUSES),
  ttl: generateTTL(),
}));

// A Record type for factory
interface ARecordData {
  type: "A";
  name: string;
  ip: string;
  ttl?: number;
  proxy?: ProxyStatus;
}

/**
 * A Record factory
 */
export const aRecordFactory = Factory.define<ARecordData>(() => ({
  type: "A",
  name: generateDnsLabel(),
  ip: generateIPv4(),
  ttl: faker.datatype.boolean() ? generateTTL() : undefined,
  proxy: faker.datatype.boolean() ? faker.helpers.arrayElement(PROXY_STATUSES) : undefined,
}));

// AAAA Record type for factory
interface AAAARecordData {
  type: "AAAA";
  name: string;
  ip: string;
  ttl?: number;
  proxy?: ProxyStatus;
}

/**
 * AAAA Record factory
 */
export const aaaaRecordFactory = Factory.define<AAAARecordData>(() => ({
  type: "AAAA",
  name: generateDnsLabel(),
  ip: generateIPv6(),
  ttl: faker.datatype.boolean() ? generateTTL() : undefined,
  proxy: faker.datatype.boolean() ? faker.helpers.arrayElement(PROXY_STATUSES) : undefined,
}));

// CNAME Record type for factory
interface CNAMERecordData {
  type: "CNAME";
  name: string;
  target: string;
  ttl?: number;
  proxy?: ProxyStatus;
}

/**
 * CNAME Record factory
 */
export const cnameRecordFactory = Factory.define<CNAMERecordData>(() => ({
  type: "CNAME",
  name: generateDnsLabel(),
  target: generateHostname(),
  ttl: faker.datatype.boolean() ? generateTTL() : undefined,
  proxy: faker.datatype.boolean() ? faker.helpers.arrayElement(PROXY_STATUSES) : undefined,
}));

// MX Record type for factory
interface MXRecordData {
  type: "MX";
  name: string;
  priority: number;
  target: string;
  ttl?: number;
}

/**
 * MX Record factory
 */
export const mxRecordFactory = Factory.define<MXRecordData>(() => ({
  type: "MX",
  name: "@",
  priority: generateMXPriority(),
  target: `mail.${generateHostname()}`,
  ttl: faker.datatype.boolean() ? generateTTL() : undefined,
}));

// TXT Record type for factory
interface TXTRecordData {
  type: "TXT";
  name: string;
  content: string;
  ttl?: number;
}

/**
 * TXT Record factory
 */
export const txtRecordFactory = Factory.define<TXTRecordData>(() => ({
  type: "TXT",
  name: "@",
  content: faker.lorem.sentence(),
  ttl: faker.datatype.boolean() ? generateTTL() : undefined,
}));

// CAA Record type for factory
interface CAARecordData {
  type: "CAA";
  name: string;
  flags?: number;
  tag: (typeof CAA_TAGS)[number];
  value: string;
  ttl?: number;
}

/**
 * CAA Record factory
 */
export const caaRecordFactory = Factory.define<CAARecordData>(() => ({
  type: "CAA",
  name: "@",
  flags: 0,
  tag: faker.helpers.arrayElement(CAA_TAGS),
  value: faker.helpers.arrayElement(CERTIFICATE_AUTHORITIES),
  ttl: faker.datatype.boolean() ? generateTTL() : undefined,
}));

// Export helper functions and constants
export {
  generateDnsLabel,
  generateHostname,
  generateTTL,
  generateMXPriority,
  PROXY_STATUSES,
  CAA_TAGS,
  CERTIFICATE_AUTHORITIES,
};

/**
 * Mock implementations of DNSControl DSL functions
 * These mocks allow testing without actual DNS operations
 */

import { vi } from "vitest";

// Types for mock return values
export interface MockRecord {
  type: string;
  name: string;
  [key: string]: unknown;
}

export interface MockDomain {
  name: string;
  registrar: string;
  dnsProvider: string;
  records: MockRecord[];
}

// Storage for captured domain registrations
export const capturedDomains: MockDomain[] = [];

// Mock implementations
export const mockDnsControl = {
  // Domain registration - D(domain, registrar, dnsProvider, ...records)
  D: vi.fn((domain: string, registrar: string, ...rest: unknown[]) => {
    const domainObj: MockDomain = {
      name: domain,
      registrar: String(registrar),
      dnsProvider: "cloudflare",
      records: rest.flat() as MockRecord[],
    };
    capturedDomains.push(domainObj);
    return domainObj;
  }),

  // A record (IPv4)
  A: vi.fn((name: string, ip: string, ...modifiers: unknown[]) => ({
    type: "A",
    name,
    ip,
    modifiers: modifiers.flat(),
  })),

  // AAAA record (IPv6)
  AAAA: vi.fn((name: string, ip: string, ...modifiers: unknown[]) => ({
    type: "AAAA",
    name,
    ip,
    modifiers: modifiers.flat(),
  })),

  // CNAME record
  CNAME: vi.fn((name: string, target: string, ...modifiers: unknown[]) => ({
    type: "CNAME",
    name,
    target,
    modifiers: modifiers.flat(),
  })),

  // MX record
  MX: vi.fn((name: string, priority: number, target: string, ...modifiers: unknown[]) => ({
    type: "MX",
    name,
    priority,
    target,
    modifiers: modifiers.flat(),
  })),

  // TXT record
  TXT: vi.fn((name: string, content: string, ...modifiers: unknown[]) => ({
    type: "TXT",
    name,
    content,
    modifiers: modifiers.flat(),
  })),

  // SRV record
  SRV: vi.fn(
    (
      name: string,
      priority: number,
      weight: number,
      port: number,
      target: string,
      ...modifiers: unknown[]
    ) => ({
      type: "SRV",
      name,
      priority,
      weight,
      port,
      target,
      modifiers: modifiers.flat(),
    })
  ),

  // CAA record
  CAA: vi.fn((name: string, tag: string, value: string, ...modifiers: unknown[]) => ({
    type: "CAA",
    name,
    tag,
    value,
    modifiers: modifiers.flat(),
  })),

  // NS record
  NS: vi.fn((name: string, target: string, ...modifiers: unknown[]) => ({
    type: "NS",
    name,
    target,
    modifiers: modifiers.flat(),
  })),

  // Provider functions
  NewRegistrar: vi.fn((name: string) => name),
  NewDnsProvider: vi.fn((name: string) => name),

  // Cloudflare proxy functions (return RecordModifier objects)
  CF_PROXY_ON: vi.fn(() => ({ proxy: true })),
  CF_PROXY_OFF: vi.fn(() => ({ proxy: false })),

  // TTL modifier
  TTL: vi.fn((ttl: number) => ({ ttl })),

  // DnsProvider function
  DnsProvider: vi.fn((name: string, meta?: Record<string, unknown>) => ({
    type: "DnsProvider",
    name,
    meta,
  })),

  // DefaultTTL function
  DefaultTTL: vi.fn((ttl: number) => ({ type: "DefaultTTL", ttl })),

  // IGNORE function (for ignoring records)
  IGNORE: vi.fn((pattern: string, types?: string) => ({
    type: "IGNORE",
    pattern,
    types,
  })),

  // IGNORE_NAME function (for ignoring specific record names)
  IGNORE_NAME: vi.fn((name: string, types?: string) => ({
    type: "IGNORE_NAME",
    name,
    types,
  })),

  // CF_REDIRECT function (Cloudflare redirect)
  CF_REDIRECT: vi.fn((code: number, destination: string) => ({
    type: "CF_REDIRECT",
    code,
    destination,
  })),

  // CF_TEMP_REDIRECT function (Cloudflare temporary redirect)
  CF_TEMP_REDIRECT: vi.fn((destination: string) => ({
    type: "CF_TEMP_REDIRECT",
    destination,
  })),
};

// Reset all mocks and captured data
export function resetMocks(): void {
  capturedDomains.length = 0;
  Object.values(mockDnsControl).forEach((mock) => {
    if (typeof mock === "function" && "mockClear" in mock) {
      mock.mockClear();
    }
  });
}

// Get captured domains for assertions
export function getCapturedDomains(): MockDomain[] {
  return [...capturedDomains];
}

// Get records for a specific domain
export function getRecordsForDomain(domainName: string): MockRecord[] {
  const domain = capturedDomains.find((d) => d.name === domainName);
  return domain?.records ?? [];
}

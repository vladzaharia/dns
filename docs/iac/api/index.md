# API Reference

Complete API reference for Polaris DNS.

## Overview

Polaris DNS provides a type-safe API for managing DNS records. The API is organized into several modules:

| Module                       | Description                      |
| ---------------------------- | -------------------------------- |
| [Domain Builders](./domains) | Create and configure domains     |
| [Record Builders](./records) | Create DNS records               |
| [Server Registry](./servers) | Server definitions and utilities |
| [Service Types](./services)  | Service configuration types      |
| [Mail Providers](./mail)     | Email provider helpers           |

## Quick Reference

### Domain Functions

```typescript
import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "./lib/domain.js";

// Create a domain
createDomain(options: DomainBuilderOptions, ...records: DomainModifier[]): void
```

### Record Functions

```typescript
import {
  createARecord,
  createAAAARecord,
  createCNAMERecord,
  createMXRecord,
  createTXTRecord,
  createCAARecord,
  createSRVRecord,
  createServiceRecord,
} from "./lib/record.js";

// Address records
createARecord(name: string, ip: string, options?: RecordOptions): DomainModifier
createAAAARecord(name: string, ip: string, options?: RecordOptions): DomainModifier

// Alias records
createCNAMERecord(name: string, target: string, options?: RecordOptions): DomainModifier

// Mail records
createMXRecord(name: string, priority: number, target: string, options?: RecordOptions): DomainModifier

// Text records
createTXTRecord(name: string, content: string, options?: RecordOptions): DomainModifier

// Security records
createCAARecord(name: string, tag: CAATag, value: string, options?: RecordOptions): DomainModifier

// Service records
createSRVRecord(name: string, priority: number, weight: number, port: number, target: string, options?: RecordOptions): DomainModifier

// Server-based records
createServiceRecord(subdomain: string, server: ServerName, options?: ServiceRecordOptions): DomainModifier
```

### Server Functions

```typescript
import {
  getServer,
  getServerIP,
  getServerHostname,
  getServerPrefix,
  isServerDDNS,
  getServersByLocation,
  getAllServerNames,
} from "./lib/server.js";

// Get server info
getServer(name: ServerName): Server
getServerIP(name: ServerName): string
getServerHostname(name: ServerName): string
getServerPrefix(name: ServerName): string
isServerDDNS(name: ServerName): boolean

// Query servers
getServersByLocation(location: ServerLocation): Server[]
getAllServerNames(): ServerName[]
```

### Mail Functions

```typescript
import { createFastmailRecords, createFastmailSubdomainRecords } from "./mail/fastmail.js";

// Fastmail records
createFastmailRecords(options: FastmailOptions): DomainModifier[]
createFastmailSubdomainRecords(domain: string, subdomain: string): DomainModifier[]
```

## Types

### DomainBuilderOptions

```typescript
interface DomainBuilderOptions {
  name: string; // Domain name
  category: DomainCategory; // Domain category
  registrar?: unknown; // Registrar (default: NO_REGISTRAR)
  dnsProvider?: unknown; // DNS provider (default: CLOUDFLARE)
  ignorePatterns?: string[]; // Patterns to ignore
  defaultTTL?: number; // Default TTL (default: 1)
}
```

### RecordOptions

```typescript
interface RecordOptions {
  proxy?: ProxyStatus; // Cloudflare proxy ("on" | "off" | "full")
  ttl?: number; // TTL in seconds
}
```

### ServiceRecordOptions

```typescript
interface ServiceRecordOptions {
  proxy?: ProxyStatus; // Cloudflare proxy
  useTunnel?: boolean; // Use tunnel instead of direct
  ttl?: number; // Custom TTL
}
```

### Server

```typescript
interface Server {
  readonly name: ServerName;
  readonly location: ServerLocation;
  readonly prefix: string;
  readonly hostname: string;
  readonly ip: string;
  readonly ipv6?: string;
  readonly isDDNS?: boolean;
}
```

## Constants

### Providers

```typescript
// DNS Providers
export const CLOUDFLARE: DnsProvider;
export const ROUTE53: DnsProvider;

// Registrars
export const NO_REGISTRAR: Registrar;
export const CF_REGISTRAR: Registrar;
```

### Server Names

```typescript
type ServerName =
  | "greenwood"
  | "caphill"
  | "pangolin"
  | "upvpn"
  | "reprise1"
  | "reprise2"
  | "reprise3"
  | "reprise4"
  | "local-traefik";
```

## Next Steps

- [Domain Builders](./domains) - Detailed domain API
- [Record Builders](./records) - Detailed record API

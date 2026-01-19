# Domain Builders

API reference for domain builder functions.

## Functions

### createDomain

Creates a DNS domain with the specified configuration and records.

```typescript
function createDomain(
  options: DomainBuilderOptions,
  ...records: DomainModifier[]
): void
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `DomainBuilderOptions` | Domain configuration options |
| `records` | `DomainModifier[]` | DNS records to add to the domain |

#### Example

```typescript
import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "./lib/domain.js";
import { createARecord, createCNAMERecord } from "./lib/record.js";

createDomain(
  {
    name: "example.com",
    category: "personal",
    registrar: NO_REGISTRAR,
    dnsProvider: CLOUDFLARE,
  },
  createARecord("@", "192.0.2.1"),
  createCNAMERecord("www", "@"),
);
```

## Types

### DomainBuilderOptions

Configuration options for creating a domain.

```typescript
interface DomainBuilderOptions {
  /** The fully qualified domain name */
  name: string;

  /** Category for organizing domains */
  category: DomainCategory;

  /** Registrar provider instance */
  registrar?: unknown;

  /** DNS provider instance */
  dnsProvider?: unknown;

  /** Patterns for records to ignore during sync */
  ignorePatterns?: string[];

  /** Default TTL for all records in this domain */
  defaultTTL?: number;
}
```

### DomainCategory

```typescript
type DomainCategory = "personal" | "infrastructure" | "services" | "local";
```

## Constants

### CLOUDFLARE

Cloudflare DNS provider instance.

```typescript
export const CLOUDFLARE: DnsProvider;
```

### NO_REGISTRAR

No-op registrar for DNS-only management.

```typescript
export const NO_REGISTRAR: Registrar;
```

### CF_REGISTRAR

Cloudflare registrar instance.

```typescript
export const CF_REGISTRAR: Registrar;
```

## See Also

- [Record Builders](./records) - Create DNS records
- [Server Registry](./servers) - Server definitions
- [Managing Zones Guide](../guides/zones) - Zone management guide

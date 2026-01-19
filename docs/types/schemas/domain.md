# Domain Schemas

Zod schemas for domain configuration validation.

## Overview

Domain schemas validate the complete structure of domain configurations, including all records and metadata.

## Schemas

### domainSchema

Validates complete domain configuration.

```typescript
import { domainSchema } from "@vladzaharia/dnscontrol-types";

domainSchema.parse({
  name: "example.com",
  registrar: "none",
  dnsProviders: { cloudflare: 1 },
  defaultTTL: 300,
  records: [
    { type: "A", name: "@", address: "192.0.2.1" },
    { type: "CNAME", name: "www", target: "@" },
  ],
});
```

**Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | FQDN |
| `registrar` | `string` | Yes | Registrar identifier |
| `dnsProviders` | `object` | Yes | Provider mapping |
| `defaultTTL` | `number` | No | Default TTL |
| `records` | `array` | Yes | DNS records |
| `unmanaged` | `array` | No | Ignore patterns |

### dnsConfigSchema

Validates complete DNSControl configuration.

```typescript
import { dnsConfigSchema } from "@vladzaharia/dnscontrol-types";

dnsConfigSchema.parse({
  registrars: [{ name: "none", type: "NONE" }],
  dns_providers: [{ name: "cloudflare", type: "CLOUDFLARE" }],
  domains: [
    {
      name: "example.com",
      registrar: "none",
      dnsProviders: { cloudflare: 1 },
      records: [],
    },
  ],
});
```

### unmanagedSchema

Validates ignore/unmanaged record patterns.

```typescript
import { unmanagedSchema } from "@vladzaharia/dnscontrol-types";

unmanagedSchema.parse({
  labelGlob: "acme-*",
  type: "TXT",
});
```

**Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `labelGlob` | `string` | No | Label pattern |
| `type` | `string` | No | Record type |
| `targetGlob` | `string` | No | Target pattern |

## Composed Schemas

### domainWithRecordsSchema

Domain with fully validated records.

```typescript
const domain = domainWithRecordsSchema.parse({
  name: "example.com",
  registrar: "none",
  dnsProviders: { cloudflare: 1 },
  records: [
    { type: "A", name: "@", address: "192.0.2.1" },
  ],
});

// Records are typed as union of all record types
domain.records.forEach(record => {
  if (record.type === "A") {
    console.log(record.address);
  }
});
```

## Validation Examples

### Valid Configuration

```typescript
const config = dnsConfigSchema.parse({
  registrars: [
    { name: "none", type: "NONE" },
    { name: "cloudflare", type: "CLOUDFLARE" },
  ],
  dns_providers: [
    { name: "cloudflare", type: "CLOUDFLARE" },
  ],
  domains: [
    {
      name: "example.com",
      registrar: "cloudflare",
      dnsProviders: { cloudflare: 1 },
      defaultTTL: 300,
      records: [
        { type: "A", name: "@", address: "192.0.2.1" },
        { type: "A", name: "www", address: "192.0.2.1" },
        { type: "MX", name: "@", priority: 10, target: "mail.example.com." },
      ],
    },
  ],
});
```

### Error Handling

```typescript
const result = domainSchema.safeParse(invalidConfig);

if (!result.success) {
  console.error("Validation errors:", result.error.issues);
}
```

## See Also

- [Base Schemas](./base) - Core schemas
- [Record Schemas](./records) - Record validation
- [Domain Types](../types/domains) - Type definitions


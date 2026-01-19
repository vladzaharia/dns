# API Reference

Complete API reference for `@vladzaharia/dnscontrol-types`.

## Overview

This package provides TypeScript types and Zod schemas for DNSControl configurations.

## Modules

### Types

Type definitions for DNS records, domains, and providers.

```typescript
import type {
  DnsRecord,
  ARecord,
  AAAARecord,
  CNAMERecord,
  MXRecord,
  TXTRecord,
  CAARecord,
  SRVRecord,
  Domain,
  DnsProvider,
  Registrar,
} from "@vladzaharia/dnscontrol-types";
```

### Schemas

Zod schemas for runtime validation.

```typescript
import {
  aRecordSchema,
  aaaaRecordSchema,
  cnameRecordSchema,
  mxRecordSchema,
  txtRecordSchema,
  caaRecordSchema,
  srvRecordSchema,
  domainSchema,
  ipv4Schema,
  ipv6Schema,
  hostnameSchema,
  ttlSchema,
} from "@vladzaharia/dnscontrol-types";
```

### Validators

Validation utility functions.

```typescript
import {
  validateRecord,
  validateDomain,
  validateConfig,
} from "@vladzaharia/dnscontrol-types";
```

## Quick Reference

### Record Types

| Type | Schema | Description |
|------|--------|-------------|
| `ARecord` | `aRecordSchema` | IPv4 address record |
| `AAAARecord` | `aaaaRecordSchema` | IPv6 address record |
| `CNAMERecord` | `cnameRecordSchema` | Canonical name |
| `MXRecord` | `mxRecordSchema` | Mail exchange |
| `TXTRecord` | `txtRecordSchema` | Text record |
| `CAARecord` | `caaRecordSchema` | CA authorization |
| `SRVRecord` | `srvRecordSchema` | Service location |

### Base Schemas

| Schema | Validates |
|--------|-----------|
| `ipv4Schema` | IPv4 addresses |
| `ipv6Schema` | IPv6 addresses |
| `hostnameSchema` | DNS hostnames |
| `ttlSchema` | TTL values (1-604800) |
| `prioritySchema` | Priority (0-65535) |
| `portSchema` | Port numbers (0-65535) |

### Domain Schemas

| Schema | Description |
|--------|-------------|
| `domainSchema` | Complete domain config |
| `domainModifierSchema` | Domain modifiers |
| `unmanagedSchema` | Ignore patterns |

## Usage Examples

### Validate a Record

```typescript
import { aRecordSchema } from "@vladzaharia/dnscontrol-types";

const result = aRecordSchema.safeParse({
  type: "A",
  name: "@",
  address: "192.0.2.1",
});

if (result.success) {
  console.log("Valid:", result.data);
} else {
  console.error("Invalid:", result.error.issues);
}
```

### Type-Safe Configurations

```typescript
import type { Domain, ARecord } from "@vladzaharia/dnscontrol-types";

const record: ARecord = {
  type: "A",
  name: "@",
  address: "192.0.2.1",
  ttl: 300,
};

const domain: Domain = {
  name: "example.com",
  registrar: "none",
  dnsProviders: { cloudflare: 1 },
  records: [record],
};
```

## Generated Documentation

For complete API documentation generated from source code, see:

- [Types Reference](./types/) - Auto-generated type documentation
- [Schemas Reference](./schemas/) - Auto-generated schema documentation

::: tip
API documentation is automatically generated from TSDoc comments using TypeDoc.
:::

## See Also

- [Types Overview](../types/) - Type documentation
- [Schemas Overview](../schemas/) - Schema documentation
- [Validators Overview](../validators/) - Validation utilities


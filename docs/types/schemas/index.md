# Zod Schemas

The `@vladzaharia/dnscontrol-types` package includes comprehensive [Zod](https://zod.dev/) schemas for runtime validation of DNS configurations.

## Overview

Zod schemas provide:

- **Runtime validation** - Validate data at runtime, not just compile time
- **Type inference** - Automatically infer TypeScript types from schemas
- **Detailed errors** - Get specific error messages for invalid data
- **Composability** - Build complex validations from simple schemas

## Schema Categories

| Category                      | Description                               | Import Path                             |
| ----------------------------- | ----------------------------------------- | --------------------------------------- |
| [Base Schemas](./base)        | Primitive types (TTL, IP addresses, etc.) | `@vladzaharia/dnscontrol-types/schemas` |
| [Record Schemas](./records)   | DNS record validation                     | `@vladzaharia/dnscontrol-types/schemas` |
| [Builder Schemas](./builders) | Domain builder configurations             | `@vladzaharia/dnscontrol-types/schemas` |
| [Domain Schemas](./domain)    | Complete domain configuration             | `@vladzaharia/dnscontrol-types/schemas` |

## Basic Usage

### Importing Schemas

```typescript
import {
  ARecordSchema,
  CNAMERecordSchema,
  MXRecordSchema,
  TXTRecordSchema,
} from "@vladzaharia/dnscontrol-types/schemas";
```

### Validating Records

```typescript
import { ARecordSchema } from "@vladzaharia/dnscontrol-types/schemas";

// Parse and validate (throws on error)
const record = ARecordSchema.parse({
  name: "@",
  target: "192.0.2.1",
  ttl: 300,
});

// Safe parse (returns result object)
const result = ARecordSchema.safeParse({
  name: "@",
  target: "invalid-ip",
});

if (!result.success) {
  console.error(result.error.format());
  // {
  //   target: { _errors: ["Invalid IPv4 address"] }
  // }
}
```

### Type Inference

Zod schemas can infer TypeScript types:

```typescript
import { ARecordSchema } from "@vladzaharia/dnscontrol-types/schemas";
import { z } from "zod";

// Infer the type from the schema
type ARecord = z.infer<typeof ARecordSchema>;

// Equivalent to:
// interface ARecord {
//   name: string;
//   target: string;  // IPv4 address
//   ttl?: number;
//   meta?: Record<string, unknown>;
// }
```

## Available Schemas

### Base Schemas

```typescript
import {
  TtlSchema, // TTL values (number or duration string)
  Ipv4AddressSchema, // IPv4 addresses
  Ipv6AddressSchema, // IPv6 addresses
  IpAddressSchema, // IPv4 or IPv6
  CaaTagSchema, // CAA record tags
  DnssecAlgorithmSchema,
} from "@vladzaharia/dnscontrol-types/schemas";
```

### Record Schemas

```typescript
import {
  // Standard records
  ARecordSchema,
  AAAARecordSchema,
  CNAMERecordSchema,
  MXRecordSchema,
  TXTRecordSchema,
  NSRecordSchema,
  PTRRecordSchema,

  // Extended records
  CAARecordSchema,
  SRVRecordSchema,
  HTTPSRecordSchema,
  TLSARecordSchema,
  SSHFPRecordSchema,
  LOCRecordSchema,

  // Pseudo records
  ALIASRecordSchema,
} from "@vladzaharia/dnscontrol-types/schemas";
```

## Validation Examples

### A Record

```typescript
import { ARecordSchema } from "@vladzaharia/dnscontrol-types/schemas";

// ✅ Valid
ARecordSchema.parse({
  name: "@",
  target: "192.0.2.1",
});

// ✅ Valid with TTL
ARecordSchema.parse({
  name: "www",
  target: "192.0.2.1",
  ttl: 300,
});

// ❌ Invalid - bad IP
ARecordSchema.parse({
  name: "@",
  target: "not-an-ip", // Error: Invalid IPv4 address
});
```

### MX Record

```typescript
import { MXRecordSchema } from "@vladzaharia/dnscontrol-types/schemas";

// ✅ Valid
MXRecordSchema.parse({
  name: "@",
  priority: 10,
  target: "mail.example.com.",
});

// ❌ Invalid - missing priority
MXRecordSchema.parse({
  name: "@",
  target: "mail.example.com.", // Error: priority is required
});
```

### CAA Record

```typescript
import { CAARecordSchema } from "@vladzaharia/dnscontrol-types/schemas";

// ✅ Valid
CAARecordSchema.parse({
  name: "@",
  tag: "issue",
  value: "letsencrypt.org",
});

// ❌ Invalid - bad tag
CAARecordSchema.parse({
  name: "@",
  tag: "invalid", // Error: must be issue, issuewild, or iodef
  value: "letsencrypt.org",
});
```

## Next Steps

- [Base Schemas](./base) - Primitive type schemas
- [Record Schemas](./records) - DNS record schemas
- [Validators](../validators/) - Validation utilities

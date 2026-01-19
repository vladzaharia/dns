# Record Schemas

Zod schemas for DNS record validation.

## Overview

Record schemas validate the structure and values of DNS records before they're passed to DNSControl.

## Record Type Schemas

### aRecordSchema

Validates A record structure.

```typescript
import { aRecordSchema } from "@vladzaharia/dnscontrol-types";

aRecordSchema.parse({
  type: "A",
  name: "@",
  address: "192.0.2.1",
  ttl: 300,
});
```

**Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `"A"` | Yes | Record type literal |
| `name` | `string` | Yes | Record name |
| `address` | `string` | Yes | IPv4 address |
| `ttl` | `number` | No | TTL in seconds |
| `proxy` | `boolean` | No | Cloudflare proxy |

### aaaaRecordSchema

Validates AAAA record structure.

```typescript
aaaaRecordSchema.parse({
  type: "AAAA",
  name: "@",
  address: "2001:db8::1",
});
```

### cnameRecordSchema

Validates CNAME record structure.

```typescript
cnameRecordSchema.parse({
  type: "CNAME",
  name: "www",
  target: "@",
});
```

**Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `"CNAME"` | Yes | Record type literal |
| `name` | `string` | Yes | Record name |
| `target` | `string` | Yes | Target hostname |

### mxRecordSchema

Validates MX record structure.

```typescript
mxRecordSchema.parse({
  type: "MX",
  name: "@",
  priority: 10,
  target: "mail.example.com.",
});
```

**Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `priority` | `number` | Yes | Mail server priority |
| `target` | `string` | Yes | Mail server hostname |

### txtRecordSchema

Validates TXT record structure.

```typescript
txtRecordSchema.parse({
  type: "TXT",
  name: "@",
  content: "v=spf1 include:_spf.google.com ~all",
});
```

### caaRecordSchema

Validates CAA record structure.

```typescript
caaRecordSchema.parse({
  type: "CAA",
  name: "@",
  tag: "issue",
  value: "letsencrypt.org",
});
```

**CAA Tags:**

- `issue` - Authorize CA for domain
- `issuewild` - Authorize CA for wildcards
- `iodef` - Incident reporting URL

### srvRecordSchema

Validates SRV record structure.

```typescript
srvRecordSchema.parse({
  type: "SRV",
  name: "_sip._tcp",
  priority: 10,
  weight: 5,
  port: 5060,
  target: "sip.example.com.",
});
```

## Union Schema

### recordSchema

Union of all record schemas.

```typescript
import { recordSchema } from "@vladzaharia/dnscontrol-types";

// Accepts any valid record type
recordSchema.parse({ type: "A", name: "@", address: "192.0.2.1" });
recordSchema.parse({ type: "CNAME", name: "www", target: "@" });
```

## See Also

- [Base Schemas](./base) - Core validation schemas
- [Record Types](../types/records) - Type definitions
- [Validators](../validators/) - Validation utilities

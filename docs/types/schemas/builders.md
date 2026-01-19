# Builder Schemas

Zod schemas for builder function validation.

## Overview

Builder schemas validate inputs to builder functions that construct DNS records and configurations.

## Schemas

### recordBuilderOptionsSchema

Validates options passed to record builder functions.

```typescript
import { recordBuilderOptionsSchema } from "@vladzaharia/dnscontrol-types";

recordBuilderOptionsSchema.parse({
  proxy: true,
  ttl: 300,
});
```

**Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `proxy` | `boolean \| "on" \| "off" \| "full"` | No | Cloudflare proxy |
| `ttl` | `number` | No | TTL in seconds |

### domainBuilderOptionsSchema

Validates domain builder configuration.

```typescript
import { domainBuilderOptionsSchema } from "@vladzaharia/dnscontrol-types";

domainBuilderOptionsSchema.parse({
  name: "example.com",
  registrar: "none",
  dnsProvider: "cloudflare",
  defaultTTL: 300,
});
```

**Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Domain name |
| `registrar` | `string` | Yes | Registrar ID |
| `dnsProvider` | `string` | Yes | DNS provider ID |
| `defaultTTL` | `number` | No | Default TTL |
| `ignorePatterns` | `string[]` | No | Patterns to ignore |

### providerOptionsSchema

Validates provider configuration options.

```typescript
import { providerOptionsSchema } from "@vladzaharia/dnscontrol-types";

providerOptionsSchema.parse({
  type: "CLOUDFLARE",
  apiToken: "xxxx",
});
```

## Proxy Status Schema

### proxyStatusSchema

Validates Cloudflare proxy status.

```typescript
import { proxyStatusSchema } from "@vladzaharia/dnscontrol-types";

proxyStatusSchema.parse("on");    // ✓ Valid
proxyStatusSchema.parse("off");   // ✓ Valid
proxyStatusSchema.parse("full");  // ✓ Valid
proxyStatusSchema.parse(true);    // ✓ Valid (coerced)
proxyStatusSchema.parse(false);   // ✓ Valid (coerced)
```

**Values:**
| Value | Description |
|-------|-------------|
| `"on"` | Proxy enabled |
| `"off"` | Proxy disabled |
| `"full"` | Full SSL mode |
| `true` | Alias for "on" |
| `false` | Alias for "off" |

## CAA Tag Schema

### caaTagSchema

Validates CAA record tags.

```typescript
import { caaTagSchema } from "@vladzaharia/dnscontrol-types";

caaTagSchema.parse("issue");      // ✓ Valid
caaTagSchema.parse("issuewild");  // ✓ Valid
caaTagSchema.parse("iodef");      // ✓ Valid
```

## Example

```typescript
import {
  recordBuilderOptionsSchema,
  domainBuilderOptionsSchema,
} from "@vladzaharia/dnscontrol-types";

// Validate record options
const recordOpts = recordBuilderOptionsSchema.parse({
  proxy: true,
  ttl: 3600,
});

// Validate domain config
const domainConfig = domainBuilderOptionsSchema.parse({
  name: "example.com",
  registrar: "none",
  dnsProvider: "cloudflare",
});
```

## See Also

- [Base Schemas](./base) - Core validation
- [Record Schemas](./records) - Record validation
- [Domain Schemas](./domain) - Domain validation


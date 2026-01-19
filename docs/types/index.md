# @vladzaharia/dnscontrol-types

[![npm version](https://img.shields.io/npm/v/@vladzaharia/dnscontrol-types.svg)](https://www.npmjs.com/package/@vladzaharia/dnscontrol-types)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![DNSControl](https://img.shields.io/badge/DNSControl-4.x-green.svg)](https://docs.dnscontrol.org/)

**Comprehensive TypeScript types and Zod validation schemas for [DNSControl](https://docs.dnscontrol.org/).**

This package provides type-safe development for DNSControl configurations, offering:

- **Complete TypeScript type definitions** for all DNSControl DSL functions
- **Zod validation schemas** for runtime validation of DNS records
- **Provider-specific types** for Cloudflare, AWS Route53, and more
- **Full JSDoc documentation** for IDE intellisense

## Features

### Type-Safe DNSControl DSL

Get full autocomplete and type checking for DNSControl's JavaScript DSL:

```typescript
/// <reference types="@vladzaharia/dnscontrol-types" />

var REG_NONE = NewRegistrar("none");
var DNS_CLOUDFLARE = NewDnsProvider("cloudflare");

D("example.com", REG_NONE, DnsProvider(DNS_CLOUDFLARE),
  A("@", "192.0.2.1"),                    // ✅ Type-safe
  A("@", "invalid"),                       // ❌ TypeScript error
  CNAME("www", "@"),
  MX("@", 10, "mail.example.com."),
  TXT("@", "v=spf1 include:_spf.example.com ~all")
);
```

### Runtime Validation with Zod

Validate DNS records at runtime with detailed error messages:

```typescript
import { ARecordSchema, CNAMERecordSchema } from "@vladzaharia/dnscontrol-types/schemas";

// Validate an A record
const aRecord = ARecordSchema.parse({
  name: "@",
  target: "192.0.2.1",
  ttl: 300,
});

// Safe parsing with error handling
const result = CNAMERecordSchema.safeParse({
  name: "www",
  target: "@",
});

if (!result.success) {
  console.error(result.error.format());
}
```

### Provider-Specific Types

Type definitions for provider-specific features:

```typescript
import type { CloudflareRecordMeta } from "@vladzaharia/dnscontrol-types/providers/cloudflare";

// Cloudflare-specific proxy setting
const record: CloudflareRecordMeta = {
  cloudflare_proxy: "on",
};
```

## Quick Links

- [Installation](./installation) - Add to your project
- [Quick Start](./quick-start) - Get started in 5 minutes
- [Types Reference](./types/) - Complete type documentation
- [Schemas Reference](./schemas/) - Zod schema documentation
- [Validators](./validators/) - Validation utilities
- [Provider Support](./providers/) - Provider-specific features

## Compatibility

| Package Version | DNSControl Version | TypeScript Version |
|-----------------|--------------------|--------------------|
| 2.x             | 4.x                | 5.0+               |
| 1.x             | 3.x                | 4.7+               |

## Contributing

Contributions are welcome! Please see our [Contributing Guide](https://github.com/vladzaharia/dns/blob/main/CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](https://github.com/vladzaharia/dns/blob/main/LICENSE) for details.

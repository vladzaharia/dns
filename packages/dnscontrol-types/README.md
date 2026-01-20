# @vladzaharia/dnscontrol-types

TypeScript type definitions and runtime validation for [DNSControl](https://docs.dnscontrol.org/) DSL.

## Installation

```bash
npm install --save-dev @vladzaharia/dnscontrol-types
```

## Usage

This package supports two usage patterns:

### Type-Only Usage (for DNSControl JS files)

Add a reference to the types in your DNSControl configuration files:

```typescript
/// <reference types="@vladzaharia/dnscontrol-types" />

var REG_NONE = NewRegistrar("none");
var DNS_CF = NewDnsProvider("cloudflare");

D("example.com", REG_NONE, DnsProvider(DNS_CF),
  A("@", "192.0.2.1"),
  AAAA("@", "2001:db8::1"),
  CNAME("www", "@"),
  MX("@", 10, "mail.example.com."),
  TXT("@", "v=spf1 include:_spf.example.com ~all")
);
```

Or configure in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@vladzaharia/dnscontrol-types"]
  }
}
```

### Compile-Time Validation

```typescript
// ✅ Strict mode - only supported record types available
D("example.com", REG_NONE, DnsProvider(DSP_CLOUDFLARE),
  Cloudflare.A("@", "1.2.3.4"),
  Cloudflare.SSHFP("@", 1, 1, "..."),  // OK - Cloudflare supports SSHFP
  Cloudflare.CF_PROXY_ON()
);

D("example.com", REG_NONE, DnsProvider(DSP_PACKETFRAME),
  Packetframe.A("@", "1.2.3.4"),
  Packetframe.SSHFP("@", 1, 1, "..."), // ❌ Error - Packetframe doesn't support SSHFP
);
```

### Runtime Validation (for TypeScript applications)

Import schemas and validators for runtime validation of DNS configurations:

```typescript
import { schemas, validators } from '@vladzaharia/dnscontrol-types';

// Validate a single record
const result = validators.validateARecord({
  name: '@',
  address: '192.0.2.1',
  ttl: 300
});

if (result.success) {
  console.log('Valid record:', result.data);
} else {
  console.error('Validation errors:', validators.formatErrors(result.errors));
}

// Or use Zod schemas directly
const parsed = schemas.ARecordSchema.safeParse({
  name: 'www',
  address: '192.0.2.1'
});

// Validate builder configurations
const spfResult = validators.validateSpfBuilder({
  label: '@',
  parts: ['v=spf1', 'include:_spf.google.com', '~all']
});

// Validate domain configurations
const domainResult = validators.validateDomainConfig({
  name: 'example.com',
  registrar: 'none',
  dnsProviders: ['cloudflare'],
  defaultTTL: 300
});
```

#### Available Imports

```typescript
// Main entry point (includes everything)
import { schemas, validators, z } from '@vladzaharia/dnscontrol-types';

// Schemas only (for tree-shaking)
import { ARecordSchema, MxRecordSchema } from '@vladzaharia/dnscontrol-types/schemas';

// Validators only
import { validateARecord, formatErrors } from '@vladzaharia/dnscontrol-types/validators';
```

## Documentation

For complete DNSControl documentation, see [docs.dnscontrol.org](https://docs.dnscontrol.org/).

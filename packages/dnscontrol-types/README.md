# @vladzaharia/dnscontrol-types

TypeScript type definitions and runtime validation for [DNSControl](https://docs.dnscontrol.org/) DSL.

## Installation

```bash
npm install --save-dev @vladzaharia/dnscontrol-types
```

## Usage

This package supports two usage patterns:

### 1. Type-Only Usage (for DNSControl JS files)

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

### 2. Runtime Validation (for TypeScript applications)

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

## What's Included

### 🆕 Compile-Time Validation

**NEW!** This package now includes compile-time validation to ensure only supported record types are used with each provider:

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

See [COMPILE_TIME_VALIDATION.md](./COMPILE_TIME_VALIDATION.md) for details.

### 🏗️ Extensible Architecture

The type system is designed for easy extensibility. All provider capability interfaces extend `BaseProviderCapabilities`, which provides:

- **Centralized documentation** - JSDoc comments are inherited by all providers
- **Compile-time enforcement** - TypeScript errors if any capability field is missing
- **Literal types** - Use `true`/`false` literals for compile-time validation

```typescript
// Example: Adding a new provider
import type { BaseProviderCapabilities } from "@vladzaharia/dnscontrol-types/base-capabilities";

export interface MyProviderCapabilities extends BaseProviderCapabilities {
  canUseA: true;
  canUseAAAA: true;
  canUseCAA: false;  // Provider doesn't support CAA
  // ... all other fields must be defined
}

export namespace MyProvider {
  export function A(name: string, address: IpAddress, ...modifiers: RecordModifier[]): DomainModifier;
  export function AAAA(name: string, address: string, ...modifiers: RecordModifier[]): DomainModifier;
  // Only include functions for supported record types
}
```

**Dependency Hierarchy (no circular dependencies):**
```
base.d.ts → base-capabilities.d.ts → providers/*.d.ts → provider-capabilities.d.ts
```

### Core Types
- `Ttl` - TTL values (number or string like "1h")
- `DomainModifier` - Return type for record and domain functions
- `RecordModifier` - Return type for TTL and provider-specific modifiers

### Top-Level Functions
- `D()` - Define a domain
- `D_EXTEND()` - Extend an existing domain
- `DEFAULTS()` - Set default modifiers
- `NewRegistrar()` - Create a registrar
- `NewDnsProvider()` - Create a DNS provider

### DNS Record Types
All standard DNS record types are supported:
- **Address**: `A`, `AAAA`
- **Alias**: `ALIAS`, `CNAME`, `DNAME`
- **Mail**: `MX`
- **Service**: `SRV`, `SVCB`, `HTTPS`, `NAPTR`
- **Security**: `CAA`, `TLSA`, `SSHFP`, `DNSKEY`, `DS`, `SMIMEA`, `OPENPGPKEY`
- **Text**: `TXT`
- **Other**: `NS`, `PTR`, `SOA`, `LOC`, `DHCID`, `RP`
- **Pseudo**: `FRAME`, `URL`, `URL301`

### Builder Functions
- `SPF_BUILDER()` - Build SPF records
- `DMARC_BUILDER()` - Build DMARC records
- `DKIM_BUILDER()` - Build DKIM records
- `CAA_BUILDER()` - Build CAA records
- `M365_BUILDER()` - Build Microsoft 365 records
- `LOC_BUILDER_*()` - Build LOC records

### Provider-Specific Types

This package includes comprehensive type definitions for **59+ DNS providers**, organized into four tiers:

#### Tier 1: Providers with Custom Record Types (16 providers)

**Cloudflare**
- `CF_PROXY_ON`, `CF_PROXY_OFF` - Proxy control
- `CF_REDIRECT()`, `CF_TEMP_REDIRECT()` - Page rule redirects
- `CF_SINGLE_REDIRECT()` - Bulk redirects
- `CF_WORKER_ROUTE()` - Worker routes
- `CF_UNIVERSALSSL_*()` - SSL control

**AWS Route53**
- `R53_ALIAS()` - AWS resource aliases
- `R53_ZONE()` - Hosted zone specification
- Routing policies: `R53_WEIGHT()`, `R53_GEO()`, `R53_FAILOVER()`, `R53_LATENCY()`

**Azure DNS**
- `AZURE_ALIAS()` - Azure resource aliases

**Other Providers with Custom Records**
- **AdGuard Home**: `ADGUARDHOME_PASSTHROUGH()`
- **Akamai**: `AKAMAICDN()`, `AKAMAI_TLC()`
- **Bunny DNS**: `BUNNY_DNS_RDR()`
- **ClouDNS**: `CLOUDNS_WR()`
- **deSEC**: `DESEC_REDIRECT()`
- **DNSimple**: `DNSIMPLE_URL()`
- **Gandi**: `GANDI_V5_ALIAS()`
- **HEDNS**: `HEDNS_NULL_MX()`
- **Namecheap**: `URL()`, `URL301()`, `FRAME()`
- **Netlify**: `NETLIFY()`, `NETLIFYv6()`
- **NS1**: `NS1_URLFWD()`
- **Porkbun**: `PORKBUN_URLFWD()`, `URL()`, `URL301()`
- **PowerDNS**: `LUA()`

#### Tier 2: Full-Featured Providers (20 providers)

Comprehensive DNS support including modern record types (CAA, SRV, SSHFP, TLSA, HTTPS, SVCB):
- DigitalOcean, Domainnameshop, Exoscale, Google Cloud DNS, Gcore
- Hetzner (legacy), Hetzner v2, Hosting.de, Huawei Cloud, INWX
- Linode, Name.com, Netcup, Oracle Cloud, OVH
- Packetframe, Realtime Register, Sakura Cloud, TransIP, Vultr

#### Tier 3: Standard Providers (20 providers)

Standard DNS capabilities with basic record types:
- AliDNS, AutoDNS, AXFR+DDNS, BIND, CNR
- CSC Global, DNS Made Easy, DNS-over-HTTPS, DNScale, Dynadot
- Easyname, Fortigate, Hexonet, Joker, Loopia
- LuaDNS, Mythic Beasts, RWTH DNS-Admin, SoftLayer, Vercel

#### Tier 4: Basic/Registrar Providers (2 providers)

Basic DNS or primarily registrar functionality:
- Internet.bs, OpenSRS

For detailed provider capabilities, see [PROVIDER_CAPABILITIES.md](./PROVIDER_CAPABILITIES.md) and the [providers directory](./providers/README.md).

## Documentation

For complete DNSControl documentation, see [docs.dnscontrol.org](https://docs.dnscontrol.org/).

## License

MIT


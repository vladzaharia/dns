# Quick Start

This guide will get you up and running with `@vladzaharia/dnscontrol-types` in under 5 minutes.

## Prerequisites

- Node.js 18+
- TypeScript 5.0+
- A DNSControl project (or we'll create one)

## Step 1: Install the Package

```bash
pnpm add -D @vladzaharia/dnscontrol-types
```

## Step 2: Configure TypeScript

Add the types to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "types": ["@vladzaharia/dnscontrol-types"],
    "strict": true
  }
}
```

## Step 3: Create a Typed Configuration

Create `dnsconfig.ts`:

```typescript
/// <reference types="@vladzaharia/dnscontrol-types" />

// =============================================================================
// Provider Configuration
// =============================================================================

/** Registrar for domains we don't manage registration for */
var REG_NONE = NewRegistrar("none");

/** Cloudflare DNS provider */
var DNS_CLOUDFLARE = NewDnsProvider("cloudflare");

// =============================================================================
// Domain: example.com
// =============================================================================

D("example.com", REG_NONE, DnsProvider(DNS_CLOUDFLARE),
  // Root domain
  A("@", "192.0.2.1"),
  AAAA("@", "2001:db8::1"),

  // Subdomains
  CNAME("www", "@"),
  CNAME("api", "api.example.com."),
  CNAME("docs", "docs.example.com."),

  // Mail configuration
  MX("@", 10, "mail.example.com."),
  MX("@", 20, "mail2.example.com."),

  // SPF record
  TXT("@", "v=spf1 include:_spf.google.com ~all"),

  // DKIM record
  TXT("google._domainkey", "v=DKIM1; k=rsa; p=MIIBIjANBgkq...")
);
```

## Step 4: Add Runtime Validation (Optional)

For runtime validation, import the Zod schemas:

```typescript
import { ARecordSchema, validateRecord, formatValidationErrors } from "@vladzaharia/dnscontrol-types";

// Validate a single record
const aRecord = {
  name: "@",
  target: "192.0.2.1",
  ttl: 300,
};

const result = ARecordSchema.safeParse(aRecord);

if (!result.success) {
  console.error("Validation failed:");
  console.error(formatValidationErrors(result.error));
  process.exit(1);
}

console.log("Valid A record:", result.data);
```

## Step 5: Compile and Run

Compile TypeScript to JavaScript for DNSControl:

```bash
# Compile
npx tsc dnsconfig.ts --outDir dist

# Preview changes
dnscontrol preview --config dist/dnsconfig.js

# Push changes (when ready)
dnscontrol push --config dist/dnsconfig.js
```

## Type Checking Benefits

With types installed, you get:

### ✅ Autocomplete
Your IDE suggests valid record types, functions, and parameters.

### ✅ Error Detection
```typescript
A("@", "not-an-ip");  // Error: Argument is not a valid IPv4 address
MX("@", "high");      // Error: Priority must be a number
```

### ✅ Documentation on Hover
Hover over any function to see its documentation and parameters.

## Common Patterns

### Using TTL

```typescript
D("example.com", REG_NONE, DnsProvider(DNS_CLOUDFLARE),
  DefaultTTL(3600),  // Set default TTL for all records
  A("@", "192.0.2.1"),
  A("fast", "192.0.2.2", TTL(60)),  // Override for specific record
);
```

### Cloudflare Proxy

```typescript
D("example.com", REG_NONE, DnsProvider(DNS_CLOUDFLARE),
  A("@", "192.0.2.1", CF_PROXY_ON),   // Proxied through Cloudflare
  A("api", "192.0.2.2", CF_PROXY_OFF), // Direct connection
);
```

### Multiple Providers

```typescript
var DNS_CLOUDFLARE = NewDnsProvider("cloudflare");
var DNS_ROUTE53 = NewDnsProvider("route53");

D("example.com", REG_NONE, 
  DnsProvider(DNS_CLOUDFLARE),
  DnsProvider(DNS_ROUTE53),  // Replicate to Route53
  A("@", "192.0.2.1")
);
```

## Next Steps

- [Types Reference](./types/) - Explore all type definitions
- [Schemas Reference](./schemas/) - Learn about validation schemas
- [Provider Support](./providers/) - Provider-specific features

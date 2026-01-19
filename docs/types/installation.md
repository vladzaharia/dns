# Installation

## Package Installation

Install `@vladzaharia/dnscontrol-types` as a development dependency:

::: code-group

```bash [pnpm]
pnpm add -D @vladzaharia/dnscontrol-types
```

```bash [npm]
npm install --save-dev @vladzaharia/dnscontrol-types
```

```bash [yarn]
yarn add -D @vladzaharia/dnscontrol-types
```

```bash [bun]
bun add -D @vladzaharia/dnscontrol-types
```

:::

## TypeScript Configuration

### Option 1: tsconfig.json (Recommended)

Add the types to your TypeScript configuration:

```json
{
  "compilerOptions": {
    "types": ["@vladzaharia/dnscontrol-types"]
  }
}
```

This makes the DNSControl global types available throughout your project.

### Option 2: Triple-Slash Directive

Add a reference directive at the top of your DNSControl files:

```typescript
/// <reference types="@vladzaharia/dnscontrol-types" />

// DNSControl globals are now typed
var REG = NewRegistrar("none");
var DNS = NewDnsProvider("cloudflare");
```

### Option 3: Explicit Imports

Import specific schemas or types as needed:

```typescript
// Import validation schemas
import { ARecordSchema, CNAMERecordSchema } from "@vladzaharia/dnscontrol-types/schemas";

// Import types
import type { DomainModifier, RecordConfig } from "@vladzaharia/dnscontrol-types";
```

## Package Exports

The package provides multiple entry points:

| Import Path | Description |
|-------------|-------------|
| `@vladzaharia/dnscontrol-types` | Main entry - types and utilities |
| `@vladzaharia/dnscontrol-types/schemas` | Zod validation schemas |
| `@vladzaharia/dnscontrol-types/validators` | Validation utilities |
| `@vladzaharia/dnscontrol-types/providers/cloudflare` | Cloudflare-specific types |

## Peer Dependencies

This package has the following peer dependencies:

| Dependency | Version | Required |
|------------|---------|----------|
| `zod` | `^3.23.0` | Optional* |
| `typescript` | `^5.0.0` | Optional |

\* Zod is only required if you use the schemas or validators.

## Verifying Installation

Create a test file to verify the types are working:

```typescript
/// <reference types="@vladzaharia/dnscontrol-types" />

// This should provide autocomplete and type checking
var REG_NONE = NewRegistrar("none");
var DNS_CF = NewDnsProvider("cloudflare");

D("test.example.com", REG_NONE, DnsProvider(DNS_CF),
  A("@", "192.0.2.1"),
  CNAME("www", "@")
);
```

If your IDE shows proper autocomplete for `NewRegistrar`, `NewDnsProvider`, `D`, `A`, `CNAME`, etc., the installation is successful.

## Troubleshooting

### Types Not Found

If TypeScript can't find the types:

1. Ensure the package is installed: `pnpm list @vladzaharia/dnscontrol-types`
2. Check your `tsconfig.json` includes the types
3. Restart your TypeScript language server

### Module Resolution Issues

For projects using ES modules, ensure your `package.json` has:

```json
{
  "type": "module"
}
```

And your `tsconfig.json` has compatible module settings:

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler"
  }
}
```

## Next Steps

- [Quick Start](./quick-start) - Create your first typed DNSControl configuration
- [Types Reference](./types/) - Explore all available types

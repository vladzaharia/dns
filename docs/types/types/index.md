# Type Definitions

The `@vladzaharia/dnscontrol-types` package provides comprehensive TypeScript type definitions for the entire DNSControl JavaScript DSL.

## Overview

The types are organized into several categories:

| Category | Description | File |
|----------|-------------|------|
| [Record Types](./records) | DNS record function types (A, AAAA, CNAME, MX, etc.) | `types/records.d.ts` |
| [Domain Types](./domains) | Domain and zone configuration types | `types/base.d.ts` |
| [Provider Types](./providers) | Provider-specific type definitions | `types/providers/*.d.ts` |
| [DSL Functions](./dsl) | Global DSL function declarations | `types/*.d.ts` |

## Global Type Declarations

When you include `@vladzaharia/dnscontrol-types` in your TypeScript configuration, the following global types become available:

### Provider Functions

```typescript
// Create a registrar instance
declare function NewRegistrar(name: string, meta?: object): string;

// Create a DNS provider instance
declare function NewDnsProvider(name: string, meta?: object): string;
```

### Domain Functions

```typescript
// Define a domain with records
declare function D(
  name: string,
  registrar: string,
  ...modifiers: DomainModifier[]
): void;

// Specify the DNS provider
declare function DnsProvider(provider: string, nsCount?: number): DomainModifier;
```

### Record Functions

All standard DNS record types are available as global functions:

```typescript
// Address records
declare function A(name: string, ip: string, ...modifiers: RecordModifier[]): DomainModifier;
declare function AAAA(name: string, ip: string, ...modifiers: RecordModifier[]): DomainModifier;

// Alias records
declare function CNAME(name: string, target: string, ...modifiers: RecordModifier[]): DomainModifier;
declare function ALIAS(name: string, target: string, ...modifiers: RecordModifier[]): DomainModifier;

// Mail records
declare function MX(name: string, priority: number, target: string, ...modifiers: RecordModifier[]): DomainModifier;

// Text records
declare function TXT(name: string, contents: string | string[], ...modifiers: RecordModifier[]): DomainModifier;

// And many more...
```

## Core Types

### DomainModifier

The `DomainModifier` type represents anything that can be passed to the `D()` function:

```typescript
type DomainModifier = 
  | RecordConfig
  | DomainConfig
  | (() => void);
```

### RecordModifier

The `RecordModifier` type represents metadata that can be attached to records:

```typescript
type RecordModifier = {
  ttl?: number;
  meta?: Record<string, unknown>;
};
```

### RecordConfig

The base configuration for all DNS records:

```typescript
interface RecordConfig {
  type: string;
  name: string;
  target?: string;
  ttl?: number;
  priority?: number;
  meta?: Record<string, unknown>;
}
```

## Type Inference

The types support full inference for complex patterns:

```typescript
// TTL is properly typed
const ttl: DomainModifier = TTL(300);

// Record modifiers are type-checked
const record = A("@", "192.0.2.1", 
  TTL(60),           // ✅ Valid modifier
  { invalid: true }  // ❌ Type error
);

// Provider-specific modifiers
const cfRecord = A("@", "192.0.2.1",
  CF_PROXY_ON,       // ✅ Cloudflare proxy modifier
);
```

## Extending Types

You can extend the types for custom use cases:

```typescript
// Extend RecordModifier for custom metadata
interface CustomRecordModifier extends RecordModifier {
  environment?: "production" | "staging" | "development";
}

// Use in your configuration
function createRecord(
  name: string, 
  ip: string, 
  options: CustomRecordModifier
): DomainModifier {
  return A(name, ip, TTL(options.ttl ?? 300));
}
```

## Next Steps

- [Record Types](./records) - Detailed record type documentation
- [Domain Types](./domains) - Domain configuration types
- [Provider Types](./providers) - Provider-specific types
- [DSL Functions](./dsl) - Complete DSL function reference


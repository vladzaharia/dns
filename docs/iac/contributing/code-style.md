# Code Style Guide

Coding standards and conventions for the project.

## TypeScript

### General Guidelines

- Use TypeScript strict mode
- Prefer `const` over `let`
- Avoid `any` - use `unknown` if type is truly unknown
- Use explicit return types for public functions

### Naming Conventions

| Type            | Convention       | Example            |
| --------------- | ---------------- | ------------------ |
| Files           | kebab-case       | `dns-record.ts`    |
| Classes         | PascalCase       | `DnsRecordBuilder` |
| Interfaces      | PascalCase       | `DnsRecord`        |
| Functions       | camelCase        | `createARecord`    |
| Constants       | UPPER_SNAKE_CASE | `DEFAULT_TTL`      |
| Type Parameters | Single uppercase | `T`, `K`, `V`      |

### Interfaces vs Types

Prefer interfaces for object shapes:

```typescript
// ✓ Good
interface DnsRecord {
  type: string;
  name: string;
}

// ✗ Avoid for object shapes
type DnsRecord = {
  type: string;
  name: string;
};
```

Use types for unions and primitives:

```typescript
// ✓ Good
type RecordType = "A" | "AAAA" | "CNAME";
type ServerName = string;
```

### Function Signatures

```typescript
// ✓ Good - explicit types, JSDoc
/**
 * Creates an A record.
 * @param name - Record name
 * @param ip - IPv4 address
 * @returns Domain modifier
 */
function createARecord(name: string, ip: string): DomainModifier {
  return A(name, ip);
}

// ✗ Avoid - implicit any, no docs
function createARecord(name, ip) {
  return A(name, ip);
}
```

## TSDoc Comments

### Functions

````typescript
/**
 * Brief description of what the function does.
 *
 * @param paramName - Description of parameter
 * @returns Description of return value
 * @throws {ErrorType} When the function might throw
 *
 * @example
 * ```typescript
 * const result = myFunction("arg");
 * ```
 */
````

### Interfaces

```typescript
/**
 * Represents a DNS record configuration.
 *
 * @remarks
 * Additional details about the interface.
 */
interface DnsRecord {
  /** Record type (A, AAAA, CNAME, etc.) */
  type: string;

  /** Record name or '@' for apex */
  name: string;
}
```

## Zod Schemas

### Schema Naming

```typescript
// Schema name = type name + "Schema"
const dnsRecordSchema = z.object({...});
type DnsRecord = z.infer<typeof dnsRecordSchema>;
```

### Schema Documentation

```typescript
const ipv4Schema = z
  .string()
  .ip({ version: "v4" })
  .describe("IPv4 address in dotted decimal notation");
```

## ESLint Rules

Key rules enforced:

```javascript
{
  "@typescript-eslint/explicit-function-return-type": "warn",
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/no-unused-vars": "error",
  "prefer-const": "error",
  "no-console": "warn"
}
```

## Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

## Import Order

```typescript
// 1. Node.js built-ins
import { readFile } from "node:fs/promises";

// 2. External packages
import { z } from "zod";

// 3. Internal packages
import { DnsRecord } from "@vladzaharia/dnscontrol-types";

// 4. Relative imports
import { createRecord } from "./record.js";
import type { RecordOptions } from "./types.js";
```

## Error Handling

```typescript
// ✓ Good - specific error types
throw new ValidationError("Invalid IP address", { field: "ip" });

// ✗ Avoid - generic errors
throw new Error("Invalid");
```

## See Also

- [Development Setup](./development) - Environment setup
- [Testing Guide](./testing) - Writing tests

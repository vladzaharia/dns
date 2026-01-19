# Error Handling

Error types and handling utilities for validation.

## Overview

The validators use Zod for schema validation, which provides detailed error information when validation fails.

## Error Types

### ZodError

The main error type from failed validation.

```typescript
import { z } from "zod";

try {
  aRecordSchema.parse(invalidData);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error("Validation failed:", error.issues);
  }
}
```

### ZodIssue

Individual validation issue.

```typescript
interface ZodIssue {
  code: string;
  path: (string | number)[];
  message: string;
  expected?: string;
  received?: string;
}
```

## Common Error Codes

| Code                 | Description           | Example                  |
| -------------------- | --------------------- | ------------------------ |
| `invalid_type`       | Wrong type provided   | String instead of number |
| `invalid_string`     | String format invalid | Invalid IPv4 address     |
| `too_small`          | Value below minimum   | TTL < 1                  |
| `too_big`            | Value above maximum   | Priority > 65535         |
| `invalid_enum_value` | Invalid enum value    | Unknown record type      |
| `invalid_literal`    | Wrong literal value   | type: "X" instead of "A" |

## Safe Parsing

Use `safeParse` for non-throwing validation:

```typescript
import { aRecordSchema } from "@vladzaharia/dnscontrol-types";

const result = aRecordSchema.safeParse({
  type: "A",
  name: "@",
  address: "invalid",
});

if (!result.success) {
  // Handle errors without exceptions
  result.error.issues.forEach((issue) => {
    console.error(`${issue.path.join(".")}: ${issue.message}`);
  });
} else {
  // Use validated data
  console.log(result.data);
}
```

## Error Formatting

### formatError

Format errors for display.

```typescript
import { formatError } from "@vladzaharia/dnscontrol-types";

const result = recordSchema.safeParse(invalidRecord);
if (!result.success) {
  const formatted = formatError(result.error);
  console.error(formatted);
  // Output: "address: Invalid IPv4 address"
}
```

### errorToString

Convert error to single string.

```typescript
import { errorToString } from "@vladzaharia/dnscontrol-types";

const errorMessage = errorToString(result.error);
// "Validation failed: address must be a valid IPv4 address"
```

## Custom Error Messages

Schemas include custom error messages:

```typescript
const hostnameSchema = z.string().regex(/.../, {
  message: "Invalid hostname: must be a valid DNS label or '@'",
});

const ipv4Schema = z.string().ip({ version: "v4" }).describe("IPv4 address");
```

## Error Handling Patterns

### Try-Catch Pattern

```typescript
function createRecord(data: unknown): DnsRecord {
  try {
    return recordSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid record: ${error.issues[0].message}`);
    }
    throw error;
  }
}
```

### Result Pattern

```typescript
function validateAndCreate(data: unknown): Result<DnsRecord> {
  const result = recordSchema.safeParse(data);

  if (result.success) {
    return { ok: true, value: result.data };
  }

  return {
    ok: false,
    error: result.error.issues.map((i) => i.message).join(", "),
  };
}
```

### Aggregated Errors

```typescript
function validateAll(records: unknown[]): AggregatedResult {
  const errors: Array<{ index: number; errors: string[] }> = [];
  const valid: DnsRecord[] = [];

  records.forEach((record, index) => {
    const result = recordSchema.safeParse(record);
    if (result.success) {
      valid.push(result.data);
    } else {
      errors.push({
        index,
        errors: result.error.issues.map((i) => i.message),
      });
    }
  });

  return { valid, errors };
}
```

## See Also

- [Validators Overview](./index) - Validation functions
- [Record Validators](./records) - Record validation
- [Zod Documentation](https://zod.dev) - Full Zod docs

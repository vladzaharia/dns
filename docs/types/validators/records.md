# Record Validators

Validation functions for DNS records.

## Overview

Record validators provide high-level validation functions that combine schema validation with semantic checks for DNS records.

## Functions

### validateRecord

Validates a single DNS record.

```typescript
import { validateRecord } from "@vladzaharia/dnscontrol-types";

const result = validateRecord({
  type: "A",
  name: "@",
  address: "192.0.2.1",
});

if (result.success) {
  console.log("Valid record:", result.data);
} else {
  console.error("Errors:", result.error.issues);
}
```

### validateARecord

Validates an A record specifically.

```typescript
import { validateARecord } from "@vladzaharia/dnscontrol-types";

validateARecord("@", "192.0.2.1"); // ✓ Valid
validateARecord("www", "192.0.2.1", 300); // ✓ Valid with TTL
validateARecord("@", "invalid"); // ✗ Error
```

### validateAAAARecord

Validates an AAAA record.

```typescript
import { validateAAAARecord } from "@vladzaharia/dnscontrol-types";

validateAAAARecord("@", "2001:db8::1"); // ✓ Valid
validateAAAARecord("@", "192.0.2.1"); // ✗ Error (IPv4)
```

### validateCNAMERecord

Validates a CNAME record.

```typescript
import { validateCNAMERecord } from "@vladzaharia/dnscontrol-types";

validateCNAMERecord("www", "@"); // ✓ Valid
validateCNAMERecord("www", "example.com"); // ✓ Valid
```

### validateMXRecord

Validates an MX record.

```typescript
import { validateMXRecord } from "@vladzaharia/dnscontrol-types";

validateMXRecord("@", 10, "mail.example.com."); // ✓ Valid
validateMXRecord("@", -1, "mail.example.com."); // ✗ Error (negative priority)
```

### validateTXTRecord

Validates a TXT record.

```typescript
import { validateTXTRecord } from "@vladzaharia/dnscontrol-types";

validateTXTRecord("@", "v=spf1 -all"); // ✓ Valid
```

### validateCAARecord

Validates a CAA record.

```typescript
import { validateCAARecord } from "@vladzaharia/dnscontrol-types";

validateCAARecord("@", "issue", "letsencrypt.org"); // ✓ Valid
validateCAARecord("@", "invalid", "example.com"); // ✗ Error (invalid tag)
```

### validateSRVRecord

Validates an SRV record.

```typescript
import { validateSRVRecord } from "@vladzaharia/dnscontrol-types";

validateSRVRecord("_sip._tcp", 10, 5, 5060, "sip.example.com."); // ✓ Valid
```

## Batch Validation

### validateRecords

Validates an array of records.

```typescript
import { validateRecords } from "@vladzaharia/dnscontrol-types";

const records = [
  { type: "A", name: "@", address: "192.0.2.1" },
  { type: "CNAME", name: "www", target: "@" },
];

const results = validateRecords(records);

results.forEach((result, i) => {
  if (!result.success) {
    console.error(`Record ${i} invalid:`, result.error);
  }
});
```

## Error Types

### ValidationError

```typescript
interface ValidationError {
  path: (string | number)[];
  message: string;
  code: string;
}
```

### ValidationResult

```typescript
type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: { issues: ValidationError[] } };
```

## See Also

- [Record Schemas](../schemas/records) - Zod schemas
- [Error Handling](./errors) - Error types
- [Record Types](../types/records) - Type definitions

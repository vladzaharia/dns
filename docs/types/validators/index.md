# Validators

The `@vladzaharia/dnscontrol-types` package includes runtime validators built on Zod schemas.

## Overview

Validators provide:

- **Runtime validation** - Catch errors before DNSControl runs
- **Type inference** - TypeScript types from schemas
- **Detailed errors** - Human-readable error messages
- **Composable** - Build custom validators

## Installation

Validators are included in the main package:

```bash
pnpm add @vladzaharia/dnscontrol-types
```

## Basic Usage

### Validating Records

```typescript
import { validateARecord, validateMXRecord } from '@vladzaharia/dnscontrol-types';

// Valid A record
const aRecord = validateARecord({
  name: '@',
  target: '192.0.2.1',
  ttl: 300,
});

// Valid MX record
const mxRecord = validateMXRecord({
  name: '@',
  priority: 10,
  target: 'mail.example.com.',
  ttl: 3600,
});
```

### Handling Validation Errors

```typescript
import { validateARecord, ValidationError } from '@vladzaharia/dnscontrol-types';

try {
  const record = validateARecord({
    name: '@',
    target: 'invalid-ip',  // Not a valid IP
  });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.message);
    console.error('Details:', error.errors);
  }
}
```

## Available Validators

### Record Validators

| Validator | Description |
|-----------|-------------|
| `validateARecord` | IPv4 address record |
| `validateAAAARecord` | IPv6 address record |
| `validateCNAMERecord` | Canonical name record |
| `validateMXRecord` | Mail exchange record |
| `validateTXTRecord` | Text record |
| `validateSRVRecord` | Service record |
| `validateCAARecord` | Certificate authority authorization |
| `validateNSRecord` | Nameserver record |
| `validatePTRRecord` | Pointer record |

### Domain Validators

| Validator | Description |
|-----------|-------------|
| `validateDomain` | Full domain configuration |
| `validateDomainName` | Domain name format |
| `validateSubdomain` | Subdomain format |

### Provider Validators

| Validator | Description |
|-----------|-------------|
| `validateProvider` | Provider configuration |
| `validateCloudflareConfig` | Cloudflare-specific config |
| `validateRoute53Config` | Route53-specific config |

## Custom Validators

### Composing Validators

```typescript
import { z } from 'zod';
import { ARecordSchema, TTLSchema } from '@vladzaharia/dnscontrol-types';

// Custom schema with additional constraints
const StrictARecordSchema = ARecordSchema.extend({
  ttl: TTLSchema.min(60).max(86400),
  comment: z.string().optional(),
});

// Create validator function
function validateStrictARecord(data: unknown) {
  return StrictARecordSchema.parse(data);
}
```

### Async Validation

```typescript
import { ARecordSchema } from '@vladzaharia/dnscontrol-types';

async function validateWithLookup(data: unknown) {
  const record = ARecordSchema.parse(data);
  
  // Additional async validation
  const isReachable = await checkIPReachable(record.target);
  if (!isReachable) {
    throw new Error(`IP ${record.target} is not reachable`);
  }
  
  return record;
}
```

## Error Formatting

### Default Error Format

```typescript
import { formatValidationError } from '@vladzaharia/dnscontrol-types';

try {
  validateARecord({ name: '@', target: 'invalid' });
} catch (error) {
  const formatted = formatValidationError(error);
  console.log(formatted);
  // Output:
  // Validation Error:
  //   - target: Invalid IP address format
}
```

### Custom Error Formatting

```typescript
import { ZodError } from 'zod';

function customFormat(error: ZodError) {
  return error.issues.map(issue => ({
    field: issue.path.join('.'),
    message: issue.message,
    code: issue.code,
  }));
}
```

## Integration Examples

### With DNSControl Config

```typescript
import { validateDomain, DomainSchema } from '@vladzaharia/dnscontrol-types';

function createValidatedDomain(config: unknown) {
  // Validate before passing to DNSControl
  const validated = validateDomain(config);
  
  // Now safe to use with DNSControl
  D(validated.name, validated.registrar, validated.dnsProvider,
    ...validated.records
  );
}
```

### With API Endpoints

```typescript
import { ARecordSchema } from '@vladzaharia/dnscontrol-types';

app.post('/api/records', (req, res) => {
  const result = ARecordSchema.safeParse(req.body);
  
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.issues,
    });
  }
  
  // Process valid record
  createRecord(result.data);
  res.json({ success: true });
});
```

## Next Steps

- [Record Validators](./records) - Detailed record validation
- [Error Formatting](./errors) - Custom error handling
- [Schemas Reference](../schemas/) - Underlying Zod schemas


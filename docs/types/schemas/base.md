# Base Schemas

Core Zod schemas for primitive DNS types.

## String Schemas

### hostnameSchema

Validates DNS hostname labels and FQDNs.

```typescript
import { hostnameSchema } from "@vladzaharia/dnscontrol-types";

hostnameSchema.parse("www");           // ✓
hostnameSchema.parse("sub.example");   // ✓
hostnameSchema.parse("@");             // ✓
hostnameSchema.parse("-invalid");      // ✗
```

**Validation Rules:**
- 1-253 characters total
- Labels 1-63 characters each
- Alphanumeric and hyphens only
- Cannot start/end with hyphen
- `@` allowed for apex records

### ipv4Schema

Validates IPv4 addresses.

```typescript
import { ipv4Schema } from "@vladzaharia/dnscontrol-types";

ipv4Schema.parse("192.0.2.1");    // ✓
ipv4Schema.parse("10.0.0.1");     // ✓
ipv4Schema.parse("256.0.0.1");    // ✗
```

### ipv6Schema

Validates IPv6 addresses.

```typescript
import { ipv6Schema } from "@vladzaharia/dnscontrol-types";

ipv6Schema.parse("2001:db8::1");           // ✓
ipv6Schema.parse("::1");                   // ✓
ipv6Schema.parse("2001:db8::invalid");     // ✗
```

## Numeric Schemas

### ttlSchema

Validates TTL values.

```typescript
import { ttlSchema } from "@vladzaharia/dnscontrol-types";

ttlSchema.parse(300);     // ✓
ttlSchema.parse(86400);   // ✓
ttlSchema.parse(0);       // ✗
ttlSchema.parse(-1);      // ✗
```

**Range:** 1 - 2147483647 seconds

### prioritySchema

Validates MX/SRV priority values.

```typescript
import { prioritySchema } from "@vladzaharia/dnscontrol-types";

prioritySchema.parse(10);     // ✓
prioritySchema.parse(0);      // ✓
prioritySchema.parse(-1);     // ✗
```

**Range:** 0 - 65535

### portSchema

Validates port numbers.

```typescript
import { portSchema } from "@vladzaharia/dnscontrol-types";

portSchema.parse(443);    // ✓
portSchema.parse(80);     // ✓
portSchema.parse(70000);  // ✗
```

**Range:** 0 - 65535

## Enum Schemas

### recordTypeSchema

DNS record type enumeration.

```typescript
import { recordTypeSchema } from "@vladzaharia/dnscontrol-types";

recordTypeSchema.parse("A");       // ✓
recordTypeSchema.parse("CNAME");   // ✓
recordTypeSchema.parse("INVALID"); // ✗
```

**Values:** `A`, `AAAA`, `CNAME`, `MX`, `TXT`, `CAA`, `SRV`, `NS`, `PTR`, `SOA`

## See Also

- [Record Schemas](./records) - Record validation
- [Domain Schemas](./domain) - Domain validation


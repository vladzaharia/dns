# Domain Types

Type definitions for DNS domains.

## Types

### Domain

Represents a complete DNS domain configuration.

```typescript
interface Domain {
  /** Fully qualified domain name */
  name: string;

  /** Registrar identifier */
  registrar: string;

  /** DNS providers */
  dnsProviders: Record<string, number>;

  /** DNS records */
  records: DnsRecord[];

  /** Metadata */
  meta?: DomainMeta;

  /** Nameservers */
  nameservers?: Nameserver[];
}
```

### DomainMeta

Optional domain metadata.

```typescript
interface DomainMeta {
  /** Auto-generate default NS records */
  auto_dnssec?: boolean;
}
```

### Nameserver

Custom nameserver definition.

```typescript
interface Nameserver {
  name: string;
  ip?: string;
}
```

## DSL Types

### D

Domain function for DNSControl DSL.

```typescript
declare function D(
  name: string,
  registrar: string,
  dnsProviders: DnsProviderConfig,
  ...records: DomainModifier[]
): void
```

### DomainModifier

Record or modifier applied to a domain.

```typescript
type DomainModifier = RecordModifier | SpecialModifier;
```

## Validation

Use the `DomainSchema` from the validators module:

```typescript
import { DomainSchema } from "@vladzaharia/dnscontrol-types";

const result = DomainSchema.safeParse(domainConfig);
if (!result.success) {
  console.error(result.error);
}
```

## See Also

- [Record Types](./records) - DNS record types
- [Provider Types](./providers) - Provider configurations
- [Validators](../validators/) - Schema validation


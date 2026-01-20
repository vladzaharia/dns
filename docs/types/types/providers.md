# Provider Types

Type definitions for DNS providers and registrars.

## DNS Providers

### DnsProvider

DNS provider function for creating provider instances.

```typescript
declare function DNS_PROVIDER(name: string, config?: ProviderConfig): DnsProviderInstance;
```

### ProviderConfig

Provider-specific configuration.

```typescript
interface ProviderConfig {
  /** Provider type identifier */
  type?: string;

  /** Provider-specific options */
  [key: string]: unknown;
}
```

### Supported Providers

| Provider     | Type            | Features          |
| ------------ | --------------- | ----------------- |
| Cloudflare   | `CLOUDFLAREAPI` | Proxy, Workers    |
| Route 53     | `ROUTE53`       | Alias records     |
| Google Cloud | `GCLOUD`        | GCP integration   |
| Azure DNS    | `AZURE_DNS`     | Azure integration |
| DigitalOcean | `DIGITALOCEAN`  | Simple DNS        |
| Bind         | `BIND`          | Zone files        |

## Registrars

### REGISTRAR

Registrar function for creating registrar instances.

```typescript
declare function REGISTRAR(name: string, config?: RegistrarConfig): RegistrarInstance;
```

### RegistrarConfig

```typescript
interface RegistrarConfig {
  /** Auto-renew domains */
  auto_renew?: boolean;

  /** Registrar-specific options */
  [key: string]: unknown;
}
```

### Supported Registrars

| Registrar  | Type            |
| ---------- | --------------- |
| None       | `NONE`          |
| Cloudflare | `CLOUDFLAREAPI` |
| Gandi      | `GANDI_V5`      |
| Namecheap  | `NAMECHEAP`     |
| Route 53   | `ROUTE53`       |

## Provider Instances

### CloudflareProvider

```typescript
interface CloudflareProvider {
  type: "CLOUDFLAREAPI";
  token?: string;
  proxied?: boolean;
}
```

### Route53Provider

```typescript
interface Route53Provider {
  type: "ROUTE53";
  key_id?: string;
  access_key?: string;
  zone_id?: string;
}
```

## Example

```typescript
import type { DnsProvider, Registrar } from "@vladzaharia/dnscontrol-types";

// Provider configuration
const cloudflare: DnsProvider = DNS_PROVIDER("cloudflare", {
  type: "CLOUDFLAREAPI",
  proxied: true,
});

// Registrar configuration
const registrar: Registrar = REGISTRAR("none");
```

## See Also

- [Domain Types](./domains) - Domain configuration
- [Provider Support](../providers/) - Provider details

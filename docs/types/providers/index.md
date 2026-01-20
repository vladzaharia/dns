# Provider Support

The `@vladzaharia/dnscontrol-types` package includes type definitions for all major DNS providers supported by DNSControl.

## Overview

Provider types enable:

- **Type-safe configuration** - Catch config errors at compile time
- **Provider-specific features** - Access provider-unique capabilities
- **Credential validation** - Ensure proper authentication setup

## Supported Providers

### DNS Providers

| Provider             | Type Name              | Features                     |
| -------------------- | ---------------------- | ---------------------------- |
| **Cloudflare**       | `CloudflareProvider`   | Proxy, Workers, Page Rules   |
| **AWS Route53**      | `Route53Provider`      | Alias records, Health checks |
| **Google Cloud DNS** | `GoogleCloudProvider`  | Private zones                |
| **Azure DNS**        | `AzureProvider`        | Traffic Manager integration  |
| **DigitalOcean**     | `DigitalOceanProvider` | Simple DNS                   |
| **Namecheap**        | `NamecheapProvider`    | Basic DNS                    |
| **GoDaddy**          | `GoDaddyProvider`      | Basic DNS                    |

### Registrars

| Registrar      | Type Name             | Features            |
| -------------- | --------------------- | ------------------- |
| **Cloudflare** | `CloudflareRegistrar` | Full management     |
| **Namecheap**  | `NamecheapRegistrar`  | Domain registration |
| **GoDaddy**    | `GoDaddyRegistrar`    | Domain registration |
| **None**       | `NoneRegistrar`       | DNS-only management |

## Usage

### Provider Configuration

```typescript
import type {
  CloudflareProvider,
  Route53Provider,
  ProviderCredentials,
} from "@vladzaharia/dnscontrol-types";

// Type-safe credentials
const credentials: ProviderCredentials = {
  cloudflare: {
    TYPE: "CLOUDFLAREAPI",
    apitoken: process.env.CF_API_TOKEN!,
  },
  route53: {
    TYPE: "ROUTE53",
    KeyId: process.env.AWS_ACCESS_KEY_ID!,
    SecretKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
};
```

### Creating Providers

```typescript
import { NewDnsProvider, NewRegistrar } from "@vladzaharia/dnscontrol-types";

// DNS Providers
const cloudflare = NewDnsProvider("cloudflare");
const route53 = NewDnsProvider("route53");

// Registrars
const noRegistrar = NewRegistrar("none");
const cfRegistrar = NewRegistrar("cloudflare");
```

### Provider-Specific Records

```typescript
import type { CloudflareRecord } from "@vladzaharia/dnscontrol-types";

// Cloudflare-specific record with proxy
const record: CloudflareRecord = {
  type: "A",
  name: "@",
  target: "192.0.2.1",
  cloudflare: {
    proxy: true,
  },
};
```

## Provider Features

### Cloudflare

```typescript
import { CF_PROXY_ON, CF_PROXY_OFF } from "@vladzaharia/dnscontrol-types";

// Proxy control
A("@", "192.0.2.1", CF_PROXY_ON);
A("mail", "192.0.2.1", CF_PROXY_OFF);

// Page Rules
CF_REDIRECT("example.com/*", "https://www.example.com/$1");

// Workers
CF_WORKER_ROUTE("api.example.com/*", "my-worker");
```

### AWS Route53

```typescript
import { R53_ALIAS } from "@vladzaharia/dnscontrol-types";

// Alias records (for AWS resources)
R53_ALIAS("@", "ELB", "my-load-balancer.us-east-1.elb.amazonaws.com.");

// Health checks
A("@", "192.0.2.1", R53_HEALTH_CHECK("my-health-check"));
```

### Google Cloud DNS

```typescript
import type { GoogleCloudConfig } from "@vladzaharia/dnscontrol-types";

const config: GoogleCloudConfig = {
  TYPE: "GCLOUD",
  project: "my-project",
  private_zone: false,
};
```

## Credential Types

### Cloudflare Credentials

```typescript
interface CloudflareCredentials {
  TYPE: "CLOUDFLAREAPI";
  apitoken?: string; // Recommended
  apikey?: string; // Legacy
  apiuser?: string; // Required with apikey
  accountid?: string; // For account-level features
}
```

### Route53 Credentials

```typescript
interface Route53Credentials {
  TYPE: "ROUTE53";
  KeyId: string;
  SecretKey: string;
  Token?: string; // For temporary credentials
}
```

### Google Cloud Credentials

```typescript
interface GoogleCloudCredentials {
  TYPE: "GCLOUD";
  project: string;
  private_zone?: boolean;
  // Uses ADC or GOOGLE_APPLICATION_CREDENTIALS
}
```

## Provider Matrix

See the [Provider Matrix](./matrix) for a complete comparison of features across providers.

## Next Steps

- [Cloudflare Guide](./cloudflare) - Cloudflare-specific features
- [Route53 Guide](./route53) - AWS Route53 features
- [Provider Matrix](./matrix) - Feature comparison

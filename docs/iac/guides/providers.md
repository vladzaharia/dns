# Working with Providers

Polaris DNS supports multiple DNS providers through DNSControl's provider system.

## Supported Providers

| Provider             | Type            | Features                     |
| -------------------- | --------------- | ---------------------------- |
| **Cloudflare**       | DNS + Registrar | Proxy, Page Rules, Workers   |
| **AWS Route53**      | DNS             | Health Checks, Alias Records |
| **Google Cloud DNS** | DNS             | Private Zones                |
| **None**             | Registrar       | DNS-only management          |

## Provider Configuration

### Credentials File

Providers are configured in `src/creds.json`:

```json
{
  "cloudflare": {
    "TYPE": "CLOUDFLAREAPI",
    "apitoken": "YOUR_API_TOKEN"
  },
  "route53": {
    "TYPE": "ROUTE53",
    "KeyId": "YOUR_ACCESS_KEY",
    "SecretKey": "YOUR_SECRET_KEY"
  },
  "none": {
    "TYPE": "NONE"
  }
}
```

### Provider Instances

Providers are instantiated in `src/lib/domain.ts`:

```typescript
// DNS Providers
export const CLOUDFLARE = NewDnsProvider("cloudflare");
export const ROUTE53 = NewDnsProvider("route53");

// Registrars
export const NO_REGISTRAR = NewRegistrar("none");
export const CF_REGISTRAR = NewRegistrar("cloudflare");
```

## Cloudflare

### API Token Setup

1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Create a token with permissions:
   - **Zone:DNS:Edit** - Manage DNS records
   - **Zone:Zone:Read** - List zones
3. Optionally add **Zone:Zone Settings:Edit** for proxy settings

### Using Cloudflare

```typescript
import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";

createDomain(
  {
    name: "example.com",
    category: "personal",
    registrar: NO_REGISTRAR,
    dnsProvider: CLOUDFLARE,
  }
  // Records...
);
```

### Cloudflare Proxy

```typescript
// Proxy enabled (orange cloud)
createARecord("@", "192.0.2.1", { proxy: "on" });

// Proxy disabled (gray cloud)
createARecord("mail", "192.0.2.1", { proxy: "off" });

// Full proxy (for CNAME flattening)
createCNAMERecord("@", "target.example.com.", { proxy: "full" });
```

### Cloudflare-Specific Features

```typescript
// Page Rules (via DNSControl)
CF_REDIRECT("example.com/*", "https://www.example.com/$1");

// Workers Routes
CF_WORKER_ROUTE("api.example.com/*", "my-worker");
```

## AWS Route53

### IAM Setup

Create an IAM user with policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "route53:ListHostedZones",
        "route53:GetHostedZone",
        "route53:ListResourceRecordSets",
        "route53:ChangeResourceRecordSets"
      ],
      "Resource": "*"
    }
  ]
}
```

### Using Route53

```typescript
import { createDomain, ROUTE53, NO_REGISTRAR } from "../../lib/domain.js";

createDomain(
  {
    name: "example.com",
    category: "infrastructure",
    registrar: NO_REGISTRAR,
    dnsProvider: ROUTE53,
  }
  // Records...
);
```

## Multiple Providers

### Split DNS

Use different providers for different domains:

```typescript
// Personal domains on Cloudflare
createDomain(
  { name: "personal.com", dnsProvider: CLOUDFLARE }
  // ...
);

// Infrastructure on Route53
createDomain(
  { name: "infra.example.com", dnsProvider: ROUTE53 }
  // ...
);
```

### Migration

To migrate between providers:

1. Add new provider to `creds.json`
2. Update domain configuration
3. Preview changes with `pnpm preview`
4. Push to new provider with `pnpm push`

## Provider-Specific Records

Some record types are provider-specific:

| Record          | Cloudflare         | Route53 | Google |
| --------------- | ------------------ | ------- | ------ |
| A               | ✅                 | ✅      | ✅     |
| CNAME           | ✅                 | ✅      | ✅     |
| ALIAS           | ✅ (CNAME flatten) | ✅      | ❌     |
| CF_REDIRECT     | ✅                 | ❌      | ❌     |
| CF_WORKER_ROUTE | ✅                 | ❌      | ❌     |

## Next Steps

- [CI/CD Workflows](./ci-cd) - Automated deployments
- [Managing Zones](./zones) - Zone configuration

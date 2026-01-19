# Cloudflare Provider

Cloudflare DNS provider configuration and features.

## Overview

Cloudflare is a fully-supported DNS provider with additional features like proxy support and Workers integration.

## Configuration

### Provider Setup

```typescript
import { NewDnsProvider } from "@vladzaharia/dnscontrol-types";

const cloudflare = NewDnsProvider("cloudflare", "CLOUDFLARE");
```

### creds.json

```json
{
  "cloudflare": {
    "TYPE": "CLOUDFLAREAPI",
    "apitoken": "your-api-token"
  }
}
```

### Environment Variables

```bash
export CF_API_TOKEN="your-api-token"
```

## Features

### Proxy Support

Cloudflare proxy (orange cloud) for CDN and security.

```typescript
// Enable proxy
A("@", "192.0.2.1", CF_PROXY_ON());

// Disable proxy
A("api", "192.0.2.1", CF_PROXY_OFF());
```

**Proxy Modes:**
| Mode | Description |
|------|-------------|
| `CF_PROXY_ON()` | Full proxy with CDN |
| `CF_PROXY_OFF()` | DNS only (gray cloud) |

### TTL Handling

With proxy enabled, TTL is automatic:

```typescript
// TTL is automatic when proxied
A("@", "192.0.2.1", CF_PROXY_ON());

// Custom TTL when not proxied
A("direct", "192.0.2.1", CF_PROXY_OFF(), TTL(300));
```

### Supported Record Types

| Type  | Proxy Support | Notes             |
| ----- | ------------- | ----------------- |
| A     | ✅            | IPv4 address      |
| AAAA  | ✅            | IPv6 address      |
| CNAME | ✅            | Aliases           |
| MX    | ❌            | Mail exchange     |
| TXT   | ❌            | Text records      |
| CAA   | ❌            | CA authorization  |
| SRV   | ❌            | Service discovery |
| NS    | ❌            | Nameservers       |

## API Token Permissions

Required permissions for your API token:

| Permission | Access |
| ---------- | ------ |
| Zone.Zone  | Read   |
| Zone.DNS   | Edit   |

### Creating an API Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use "Edit zone DNS" template
4. Select your zones
5. Copy the token

## Example

```typescript
// creds.json
{
  "cloudflare": {
    "TYPE": "CLOUDFLAREAPI",
    "apitoken": "$CF_API_TOKEN"
  }
}

// dnsconfig.js
var CF = NewDnsProvider("cloudflare", "CLOUDFLAREAPI");
var REG_NONE = NewRegistrar("none");

D("example.com", REG_NONE, DnsProvider(CF),
  A("@", "192.0.2.1", CF_PROXY_ON()),
  A("api", "192.0.2.1", CF_PROXY_OFF()),
  CNAME("www", "@", CF_PROXY_ON()),
  MX("@", 10, "mail.example.com."),
  TXT("@", "v=spf1 include:_spf.mx.cloudflare.net ~all"),
  CAA("@", "issue", "letsencrypt.org"),
);
```

## Limitations

- Maximum 3,500 DNS records per zone (free plan)
- Some record types cannot be proxied
- Proxy adds slight latency for real-time applications

## See Also

- [Provider Support](./index) - All providers
- [Route53](./route53) - AWS Route53
- [Cloudflare Docs](https://developers.cloudflare.com/dns/)

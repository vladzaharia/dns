# Concepts

This section covers the fundamental concepts you need to understand when working with Polaris DNS.

## DNS Fundamentals

### What is DNS?

The Domain Name System (DNS) translates human-readable domain names (like `example.com`) into IP addresses (like `192.0.2.1`) that computers use to communicate.

### Record Types

| Type      | Purpose                             | Example                 |
| --------- | ----------------------------------- | ----------------------- |
| **A**     | Maps name to IPv4 address           | `@ → 192.0.2.1`         |
| **AAAA**  | Maps name to IPv6 address           | `@ → 2001:db8::1`       |
| **CNAME** | Alias to another name               | `www → @`               |
| **MX**    | Mail server                         | `@ → mail.example.com`  |
| **TXT**   | Text data (SPF, DKIM, etc.)         | `@ → "v=spf1 ..."`      |
| **CAA**   | Certificate authority authorization | `@ → letsencrypt.org`   |
| **SRV**   | Service location                    | `_sip._tcp → sipserver` |

### TTL (Time to Live)

TTL specifies how long DNS records are cached:

- **Low TTL (60-300s)** - For frequently changing records
- **Medium TTL (3600s)** - Standard for most records
- **High TTL (86400s+)** - For stable records

## DNSControl

### What is DNSControl?

[DNSControl](https://docs.dnscontrol.org/) is an infrastructure-as-code tool for managing DNS. It uses a JavaScript DSL to define DNS configurations.

### How Polaris DNS Uses DNSControl

Polaris DNS wraps DNSControl with TypeScript:

```
TypeScript (Polaris DNS)
        ↓
    Webpack Build
        ↓
JavaScript (dnsconfig.js)
        ↓
    DNSControl
        ↓
  DNS Providers
```

## Polaris DNS Architecture

### Layers

1. **Zones** - Domain definitions with records
2. **Services** - Reusable service configurations
3. **Servers** - Physical/virtual server registry
4. **Mail Providers** - Email configuration helpers
5. **Record Builders** - Type-safe record creation

### Data Flow

```
Zone Files (TypeScript)
        ↓
Record Builders (createARecord, etc.)
        ↓
Domain Builder (createDomain)
        ↓
DNSControl DSL (D(), A(), CNAME(), etc.)
        ↓
dnsconfig.js
        ↓
DNSControl CLI (preview/push)
        ↓
DNS Provider API (Cloudflare, etc.)
```

## Key Concepts

### Zones

A zone represents a DNS domain. Each zone file:

- Defines the domain name
- Specifies the registrar and DNS provider
- Contains all DNS records for that domain

### Services

Services are reusable definitions that can be deployed across multiple domains:

- Define once, use everywhere
- Consistent subdomain naming
- Automatic record generation

### Servers

The server registry provides:

- Centralized IP address management
- Hostname standardization
- Location-based organization

### Providers

Polaris DNS supports multiple DNS providers:

- **Cloudflare** - Primary provider with proxy support
- **Route53** - AWS DNS
- **Google Cloud DNS** - GCP DNS

## Next Steps

- [DNS Basics](./dns-basics) - Deep dive into DNS
- [DNSControl Overview](./dnscontrol) - Learn DNSControl DSL
- [Architecture](./architecture) - Detailed architecture guide

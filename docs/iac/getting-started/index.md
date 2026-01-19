# Getting Started with Polaris DNS

Welcome to Polaris DNS! This is our internal DNS Infrastructure-as-Code platform for managing DNS records across multiple domains.

## What is Polaris DNS?

Polaris DNS is a TypeScript-based DNS Infrastructure-as-Code (IaC) solution built on top of [DNSControl](https://docs.dnscontrol.org/). It provides:

- **Declarative DNS Configuration** - Define DNS records in TypeScript with full type safety
- **Service Abstraction** - Define services once, deploy DNS records to multiple domains
- **Multi-Provider Support** - Currently uses Cloudflare, with extensibility for other providers
- **Email Integration** - Built-in support for Fastmail, Cloudflare Email Routing
- **CI/CD Workflows** - GitHub Actions for automated previews and deployments

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Polaris DNS                               │
├─────────────────────────────────────────────────────────────────┤
│  Zones                Services              Mail Providers       │
│  ├── personal/        ├── infrastructure    ├── fastmail        │
│  ├── infrastructure/  ├── media             ├── cloudflare      │
│  └── external/        ├── development       └── custom          │
│                       └── monitoring                             │
├─────────────────────────────────────────────────────────────────┤
│                    Record Builders                               │
│  createARecord, createCNAMERecord, createMXRecord, etc.         │
├─────────────────────────────────────────────────────────────────┤
│                    Domain Builder                                │
│  createDomain() → DNSControl D() function                       │
├─────────────────────────────────────────────────────────────────┤
│                      DNSControl                                  │
│  dnsconfig.js → preview → push                                  │
├─────────────────────────────────────────────────────────────────┤
│                    DNS Providers                                 │
│  Cloudflare, Route53, Google Cloud DNS, etc.                    │
└─────────────────────────────────────────────────────────────────┘
```

## Key Concepts

### Zones

Zones represent DNS domains. Each zone file defines:

- Domain name and category (personal, infrastructure, external)
- Registrar and DNS provider
- DNS records (A, CNAME, MX, TXT, etc.)

### Services

Services are reusable definitions that can be deployed across domains:

- Define subdomain, description, and target server
- Automatically generate DNS records
- Support for multiple routing strategies

### Servers

The server registry defines physical/virtual servers:

- Name, location, hostname, IP address
- Used by services for routing

## Project Structure

```
packages/polaris-dns/
├── src/
│   ├── index.ts              # Main entry point
│   ├── lib/
│   │   ├── domain.ts         # Domain builder
│   │   ├── record.ts         # Record builders
│   │   ├── server.ts         # Server registry
│   │   └── types.ts          # Core types
│   ├── services/
│   │   ├── types.ts          # Service types
│   │   ├── core.ts           # Service utilities
│   │   └── infrastructure.ts # Infrastructure services
│   ├── mail/
│   │   ├── fastmail.ts       # Fastmail configuration
│   │   └── cloudflare.ts     # Cloudflare Email Routing
│   └── zones/
│       ├── index.ts          # Zone registration
│       ├── personal/         # Personal domains
│       ├── infrastructure/   # Infrastructure domains
│       └── external/         # External/client domains
└── dist/                     # Built output (dnsconfig.js)
```

## Next Steps

- [Installation](./installation) - Set up the project locally
- [Quick Start](./quick-start) - Create your first DNS zone
- [Project Structure](./structure) - Detailed project organization
- [Concepts](../concepts/) - DNS and architecture fundamentals

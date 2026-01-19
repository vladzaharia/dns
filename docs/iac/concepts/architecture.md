# Architecture

This document describes the architecture of Polaris DNS.

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Polaris DNS                               │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Zones     │  │  Services   │  │    Mail Providers       │  │
│  │  (domains)  │  │ (reusable)  │  │  (Fastmail, Postal)     │  │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘  │
│         │                │                      │                │
│         └────────────────┼──────────────────────┘                │
│                          ▼                                       │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              Record Builders (lib/record.ts)                 ││
│  │   createARecord, createCNAMERecord, createMXRecord, etc.    ││
│  └──────────────────────────┬──────────────────────────────────┘│
│                             ▼                                    │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              Domain Builder (lib/domain.ts)                  ││
│  │                    createDomain()                            ││
│  └──────────────────────────┬──────────────────────────────────┘│
│                             ▼                                    │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                 Server Registry (lib/server.ts)              ││
│  │              Centralized server definitions                  ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ Webpack Build
┌─────────────────────────────────────────────────────────────────┐
│                      dist/dnsconfig.js                          │
│                   (DNSControl JavaScript)                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ DNSControl CLI
┌─────────────────────────────────────────────────────────────────┐
│                      DNS Providers                               │
│         Cloudflare  │  Route53  │  Google Cloud DNS             │
└─────────────────────────────────────────────────────────────────┘
```

## Package Structure

### Monorepo Layout

```
dns/
├── packages/
│   ├── polaris-dns/           # Main DNS configuration
│   ├── dnscontrol-types/      # TypeScript types (public NPM)
│   └── dnscontrol-download/   # Binary downloader
├── docs/                      # Documentation (VitePress)
└── .github/workflows/         # CI/CD
```

### polaris-dns Package

```
packages/polaris-dns/
├── src/
│   ├── index.ts              # Entry point
│   ├── lib/                  # Core utilities
│   │   ├── domain.ts         # Domain builder
│   │   ├── record.ts         # Record builders
│   │   ├── server.ts         # Server registry
│   │   └── types.ts          # Type definitions
│   ├── mail/                 # Email providers
│   │   ├── fastmail.ts       # Fastmail records
│   │   └── postal.ts         # Postal records
│   ├── services/             # Service definitions
│   │   └── *.ts              # Service categories
│   └── zones/                # Zone definitions
│       ├── index.ts          # Zone registration
│       ├── personal/         # Personal domains
│       └── infrastructure/   # Infrastructure domains
├── dist/                     # Build output
│   └── dnsconfig.js          # Generated config
└── webpack.config.js         # Build configuration
```

## Data Flow

### Build Process

1. **TypeScript Compilation**
   - Zone files import record builders
   - Record builders create DNSControl DSL calls
   - Domain builder wraps everything in `D()` calls

2. **Webpack Bundling**
   - Bundles all TypeScript into single JS file
   - Injects DNSControl globals
   - Outputs `dist/dnsconfig.js`

3. **DNSControl Execution**
   - Reads `dnsconfig.js` and `creds.json`
   - Compares with provider state
   - Generates change plan

### Record Creation Flow

```typescript
// 1. Zone file calls record builder
createARecord("@", "192.0.2.1", { proxy: "on" })

// 2. Record builder returns DNSControl modifier
→ A("@", "192.0.2.1", CF_PROXY_ON)

// 3. Domain builder collects modifiers
createDomain({ name: "example.com", ... }, ...records)

// 4. Outputs DNSControl D() call
→ D("example.com", REG_NONE, DnsProvider(DSP_CLOUDFLARE),
    A("@", "192.0.2.1", CF_PROXY_ON),
    ...
  )
```

## Key Components

### Domain Builder

Responsible for:
- Creating domain definitions
- Setting default TTL
- Configuring registrar and DNS provider
- Handling ignore patterns

### Record Builders

Provide type-safe wrappers for:
- Standard DNS records (A, AAAA, CNAME, MX, TXT, etc.)
- Service records (pointing to servers)
- Provider-specific features (Cloudflare proxy)

### Server Registry

Centralized definition of:
- Server names and locations
- IP addresses and hostnames
- DDNS flags

### Mail Providers

Pre-configured record sets for:
- Fastmail (MX, SPF, DKIM, DMARC)
- Postal (self-hosted)
- Cloudflare Email Routing

## Type System

### @vladzaharia/dnscontrol-types

Public NPM package providing:
- TypeScript type definitions
- Zod validation schemas
- Runtime validators

### Internal Types

Polaris DNS internal types:
- `DomainCategory` - Domain classification
- `ServerName` - Server identifiers
- `Service` - Service definitions
- `RecordOptions` - Record modifiers

## Build Configuration

### Webpack

- **Entry**: `src/index.ts`
- **Output**: `dist/dnsconfig.js`
- **Target**: Node.js
- **Externals**: DNSControl globals

### TypeScript

- **Target**: ES2022
- **Module**: ESNext
- **Strict mode**: Enabled

## Next Steps

- [Managing Zones](../guides/zones) - Create DNS zones
- [Creating Records](../guides/records) - Add DNS records


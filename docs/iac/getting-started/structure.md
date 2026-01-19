# Project Structure

Understanding the Polaris DNS project structure.

## Repository Layout

```
dns/
├── packages/                    # Monorepo packages
│   ├── polaris-dns/            # Main DNS configuration
│   ├── dnscontrol-types/       # TypeScript types (NPM package)
│   └── dnscontrol-download/    # DNSControl binary downloader
├── docs/                       # Documentation (VitePress)
├── .github/                    # GitHub configuration
│   └── workflows/              # CI/CD workflows
├── pnpm-workspace.yaml         # Workspace configuration
├── package.json                # Root package
└── tsconfig.json               # TypeScript configuration
```

## Package: polaris-dns

The main DNS configuration package.

```
packages/polaris-dns/
├── src/
│   ├── index.ts               # Entry point - registers all zones
│   ├── creds.json             # Provider credentials (not in git)
│   │
│   ├── lib/                   # Core utilities
│   │   ├── domain.ts          # Domain builder (createDomain)
│   │   ├── record.ts          # Record builders (createARecord, etc.)
│   │   ├── server.ts          # Server registry
│   │   ├── types.ts           # Type definitions
│   │   └── index.ts           # Library exports
│   │
│   ├── mail/                  # Email provider configurations
│   │   ├── fastmail.ts        # Fastmail records
│   │   ├── postal.ts          # Postal (self-hosted) records
│   │   └── index.ts           # Mail exports
│   │
│   ├── services/              # Service definitions
│   │   ├── infrastructure.ts  # Infrastructure services
│   │   ├── media.ts           # Media services
│   │   ├── productivity.ts    # Productivity tools
│   │   └── index.ts           # Service exports
│   │
│   └── zones/                 # Zone definitions
│       ├── index.ts           # Zone registration
│       ├── personal/          # Personal domains
│       │   ├── vlad-gg.ts
│       │   └── ...
│       └── infrastructure/    # Infrastructure domains
│           ├── plrs-im.ts
│           └── ...
│
├── dist/                      # Build output
│   └── dnsconfig.js           # Generated DNSControl config
│
├── webpack.config.js          # Webpack configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Package manifest
```

## Package: dnscontrol-types

Public NPM package with TypeScript types.

```
packages/dnscontrol-types/
├── src/
│   ├── index.ts               # Main exports
│   ├── types/                 # Type definitions
│   │   ├── records.ts         # DNS record types
│   │   ├── domains.ts         # Domain types
│   │   └── providers.ts       # Provider types
│   ├── schemas/               # Zod validation schemas
│   │   ├── base.ts            # Base schemas
│   │   ├── records.ts         # Record schemas
│   │   └── domain.ts          # Domain schemas
│   └── validators/            # Validation utilities
│       └── index.ts           # Validator exports
│
├── dist/                      # Build output
├── tsconfig.json              # TypeScript configuration
└── package.json               # Package manifest
```

## Package: dnscontrol-download

DNSControl binary downloader.

```
packages/dnscontrol-download/
├── src/
│   └── download.ts            # Download script
├── bin/                       # Downloaded binaries
│   ├── dnscontrol-Darwin      # macOS binary
│   ├── dnscontrol-Linux       # Linux binary
│   └── dnscontrol-VERSION     # Version marker
└── package.json               # Package manifest
```

## Key Files

### Entry Point (index.ts)

```typescript
// packages/polaris-dns/src/index.ts
import { registerAllZones } from "./zones/index.js";

// Banner and initialization
console.log("Building DNS zones...");

// Register all zones
registerAllZones();

console.log("All zones registered.");
```

### Zone Registration

```typescript
// packages/polaris-dns/src/zones/index.ts
import { registerVladGg } from "./personal/vlad-gg.js";
import { registerPlrsIm } from "./infrastructure/plrs-im.js";

export function registerAllZones(): void {
  // Personal domains
  registerVladGg();
  
  // Infrastructure domains
  registerPlrsIm();
}
```

### Zone Definition

```typescript
// packages/polaris-dns/src/zones/personal/vlad-gg.ts
import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";
import { createARecord, createCNAMERecord } from "../../lib/record.js";

export function registerVladGg(): void {
  createDomain(
    {
      name: "vlad.gg",
      category: "personal",
      registrar: NO_REGISTRAR,
      dnsProvider: CLOUDFLARE,
    },
    createARecord("@", "192.0.2.1"),
    createCNAMERecord("www", "@"),
  );
}
```

## Configuration Files

| File | Purpose |
|------|---------|
| `pnpm-workspace.yaml` | Defines monorepo packages |
| `tsconfig.json` | TypeScript compiler options |
| `webpack.config.js` | Webpack bundler configuration |
| `creds.json` | Provider credentials (not in git) |

## Next Steps

- [Quick Start](./quick-start) - Create your first zone
- [Managing Zones](../guides/zones) - Zone configuration guide


# Managing Zones

This guide explains how to create and manage DNS zones in Polaris DNS.

## Zone Structure

Each zone is defined in a TypeScript file under `src/zones/`:

```text
src/zones/
├── index.ts              # Exports all zone registrations
├── personal/
│   ├── vlad-gg.ts        # vlad.gg zone
│   └── example-com.ts    # example.com zone
├── infrastructure/
│   └── plrs-im.ts        # plrs.im infrastructure zone
├── services/
│   └── polaris-express.ts # Service domain
└── local/
    └── danger-direct.ts  # Local/emergency domain
```

## Creating a New Zone

### Step 1: Create the Zone File

Create a new file in the appropriate category folder:

```typescript
// src/zones/personal/my-domain-com.ts

/**
 * my-domain.com - Description of the domain
 */

import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";
import { createARecord, createCNAMERecord, createTXTRecord } from "../../lib/record.js";

const DOMAIN = "my-domain.com";

export function registerMyDomainCom(): void {
  console.log(`Zone: ${DOMAIN}`);

  createDomain(
    {
      name: DOMAIN,
      category: "personal",
      registrar: NO_REGISTRAR,
      dnsProvider: CLOUDFLARE,
    },

    // Root domain
    createARecord("@", "192.0.2.1"),

    // Subdomains
    createCNAMERecord("www", "@"),

    // Verification records
    createTXTRecord("@", "google-site-verification=abc123")
  );
}
```

### Step 2: Register the Zone

Add the zone to `src/zones/index.ts`:

```typescript
// src/zones/index.ts

import { registerMyDomainCom } from "./personal/my-domain-com.js";

export function registerAllZones(): void {
  // Personal domains
  registerMyDomainCom();

  // ... other zones
}
```

### Step 3: Build and Preview

```bash
pnpm build
pnpm preview
```

## Zone Configuration Options

### Domain Builder Options

```typescript
interface DomainBuilderOptions {
  /** Domain name (e.g., "example.com") */
  name: string;

  /** Zone category for organization */
  category: "personal" | "infrastructure" | "services" | "local";

  /** Registrar provider instance */
  registrar: string;

  /** DNS provider instance */
  dnsProvider: string;

  /** Patterns of records to ignore during sync */
  ignorePatterns?: string[];
}
```

### Ignore Patterns

Use ignore patterns to exclude records managed outside Polaris DNS:

```typescript
createDomain(
  {
    name: "example.com",
    category: "personal",
    registrar: NO_REGISTRAR,
    dnsProvider: CLOUDFLARE,
    ignorePatterns: [],
  },

  // Records...

  // Ignore Cloudflare-managed records
  IGNORE_NAME("status", "A,CNAME,AAAA"),
  IGNORE_NAME("*._domainkey")
);
```

## Zone Categories

### Personal Zones

Personal domains for individual use:

```typescript
createDomain({
  name: "vlad.gg",
  category: "personal",
  // ...
});
```

### Infrastructure Zones

Domains used for infrastructure services:

```typescript
createDomain({
  name: "plrs.im",
  category: "infrastructure",
  // ...
});
```

### Services Zones

Domains dedicated to specific services:

```typescript
createDomain({
  name: "polaris.express",
  category: "services",
  // ...
});
```

### Local Zones

Local or emergency router domains:

```typescript
createDomain({
  name: "danger.direct",
  category: "local",
  // ...
});
```

## Best Practices

1. **One zone per file** - Keep each domain in its own file
2. **Use constants** - Define `DOMAIN` as a constant for reuse
3. **Add comments** - Document the purpose of each zone
4. **Group records** - Organize records by purpose (website, mail, etc.)
5. **Use services** - Extract common patterns into services

## Next Steps

- [Creating Records](./records) - Learn about record types
- [Service Definitions](./services) - Create reusable services

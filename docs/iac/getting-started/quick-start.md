# Quick Start

Create and deploy your first DNS zone in 5 minutes.

## 1. Create a Zone File

Create a new file at `src/zones/personal/my-domain.ts`:

```typescript
/**
 * DNS configuration for my-domain.com
 */

import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";
import { createARecord, createCNAMERecord, createTXTRecord } from "../../lib/record.js";

/**
 * Register my-domain.com zone
 */
export function registerMyDomain(): void {
  createDomain(
    {
      name: "my-domain.com",
      category: "personal",
      registrar: NO_REGISTRAR,
      dnsProvider: CLOUDFLARE,
    },

    // Root domain
    createARecord("@", "192.0.2.1"),

    // WWW subdomain
    createCNAMERecord("www", "@"),

    // Verification record
    createTXTRecord("@", "google-site-verification=abc123")
  );
}
```

## 2. Register the Zone

Add your zone to `src/zones/index.ts`:

```typescript
// Import your zone
import { registerMyDomain } from "./personal/my-domain.js";

// Add to registration function
export function registerAllZones(): void {
  // ... existing zones ...

  registerMyDomain();
}
```

## 3. Build the Configuration

```bash
cd packages/polaris-dns
pnpm build
```

## 4. Preview Changes

```bash
pnpm preview
```

You'll see output showing what records will be created:

```
******************** Domain: my-domain.com
----- Getting nameservers from: cloudflare
----- DNS Provider: cloudflare...
1 correction
#1: CREATE A my-domain.com 192.0.2.1 ttl=1
#2: CREATE CNAME www.my-domain.com @ ttl=1
#3: CREATE TXT my-domain.com "google-site-verification=abc123" ttl=1
```

## 5. Apply Changes

When you're ready to apply:

```bash
pnpm push
```

::: warning
Always preview before pushing! DNS changes can affect production services.
:::

## Adding More Records

### Multiple A Records

```typescript
createDomain(
  { name: "my-domain.com", category: "personal" },

  createARecord("@", "192.0.2.1"),
  createARecord("api", "192.0.2.2"),
  createARecord("staging", "192.0.2.3")
);
```

### With Cloudflare Proxy

```typescript
// Proxy enabled (default for most records)
createARecord("@", "192.0.2.1", { proxy: "on" }),

// Proxy disabled (for non-HTTP services)
createARecord("mail", "192.0.2.1", { proxy: "off" }),
```

### Email Records

```typescript
import { createFastmailRecords } from "../../mail/fastmail.js";

createDomain(
  { name: "my-domain.com", category: "personal" },

  // All Fastmail records
  ...createFastmailRecords({ domain: "my-domain.com" })
);
```

### Service Records

```typescript
import { createServiceRecord } from "../../lib/record.js";

createDomain(
  { name: "my-domain.com", category: "personal" },

  // Point to a server
  createServiceRecord("app", "greenwood", { proxy: "on" })
);
```

## Common Patterns

### Apex + WWW

```typescript
createARecord("@", "192.0.2.1"),
createCNAMERecord("www", "@"),
```

### Wildcard Subdomain

```typescript
createARecord("*", "192.0.2.1"),
```

### External Service

```typescript
createCNAMERecord("blog", "custom.ghost.io."),
createCNAMERecord("docs", "cname.vercel-dns.com."),
```

## Next Steps

- [Managing Zones](../guides/zones) - Advanced zone configuration
- [DNS Records](../guides/records) - All record types
- [Services](../guides/services) - Reusable service definitions
- [Email Setup](../guides/mail) - Configure email providers

# Email Configuration

Polaris DNS provides built-in support for configuring email providers with proper DNS records.

## Supported Providers

| Provider                     | Use Case          | Module               |
| ---------------------------- | ----------------- | -------------------- |
| **Fastmail**                 | Personal email    | `mail/fastmail.ts`   |
| **Cloudflare Email Routing** | Email forwarding  | `mail/cloudflare.ts` |
| **Postal**                   | Self-hosted email | `mail/postal.ts`     |

## Fastmail

Fastmail is the recommended provider for personal email domains.

### Basic Setup

```typescript
import { createFastmailRecords } from "../../mail/fastmail.js";

createDomain(
  { name: "example.com", category: "personal" },

  // Add all Fastmail records
  ...createFastmailRecords({ domain: "example.com" })

  // Other records...
);
```

### Configuration Options

```typescript
interface FastmailOptions {
  /** The domain name (required for DKIM) */
  domain: string;

  /** Root record name (default: "@") */
  rootRecord?: string;

  /** Include wildcard MX records (default: true) */
  includeWildcard?: boolean;

  /** DMARC policy (default: "none") */
  dmarcPolicy?: "none" | "quarantine" | "reject";
}
```

### Generated Records

`createFastmailRecords()` generates:

| Record           | Type        | Purpose               |
| ---------------- | ----------- | --------------------- |
| `mail`           | CNAME       | Webmail access        |
| `@`              | MX (10)     | Primary mail server   |
| `@`              | MX (20)     | Secondary mail server |
| `*`              | MX (10, 20) | Subdomain mail        |
| `@`              | TXT         | SPF record            |
| `_dmarc`         | TXT         | DMARC policy          |
| `fm1._domainkey` | CNAME       | DKIM key 1            |
| `fm2._domainkey` | CNAME       | DKIM key 2            |
| `fm3._domainkey` | CNAME       | DKIM key 3            |

### Subdomain Email

For email on a subdomain:

```typescript
import { createFastmailSubdomainRecords } from "../../mail/fastmail.js";

createDomain(
  { name: "example.com", category: "personal" },

  // Email for notifications.example.com
  ...createFastmailSubdomainRecords("example.com", "notifications")
);
```

## Cloudflare Email Routing

For simple email forwarding without a full mailbox.

### Setup

```typescript
import { createCloudflareEmailRecords } from "../../mail/cloudflare.js";

createDomain(
  { name: "example.com", category: "personal" },

  // Add Cloudflare Email Routing records
  ...createCloudflareEmailRecords()
);
```

### Generated Records

| Record | Type | Purpose                 |
| ------ | ---- | ----------------------- |
| `@`    | MX   | Cloudflare mail servers |
| `@`    | TXT  | SPF for Cloudflare      |

## Postal (Self-Hosted)

For self-hosted email with Postal.

### Setup

```typescript
import { createPostalRecords } from "../../mail/postal.js";

createDomain(
  { name: "example.com", category: "infrastructure" },

  ...createPostalRecords({
    domain: "example.com",
    postalHostname: "postal.example.com",
    returnPath: "rp.postal.example.com",
    dkimKey: "MIIBIjANBgkq...",
  })
);
```

## Email Security Records

### SPF (Sender Policy Framework)

```typescript
// Manual SPF record
createTXTRecord("@", "v=spf1 include:_spf.google.com ~all");

// Multiple includes
createTXTRecord("@", "v=spf1 include:spf.messagingengine.com include:sendgrid.net ~all");
```

### DMARC

```typescript
// Monitoring only
createTXTRecord("_dmarc", "v=DMARC1; p=none; rua=mailto:dmarc@example.com");

// Quarantine suspicious
createTXTRecord("_dmarc", "v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com");

// Reject failures
createTXTRecord("_dmarc", "v=DMARC1; p=reject; rua=mailto:dmarc@example.com");
```

### DKIM

DKIM records are typically CNAMEs to provider-hosted keys:

```typescript
// Fastmail DKIM
createCNAMERecord("fm1._domainkey", "fm1.example.com.dkim.fmhosted.com.");

// Google Workspace DKIM
createTXTRecord("google._domainkey", "v=DKIM1; k=rsa; p=MIIBIjAN...");
```

## Best Practices

1. **Always set SPF** - Prevents email spoofing
2. **Enable DKIM** - Cryptographic email signing
3. **Configure DMARC** - Start with `p=none`, then tighten
4. **Test deliverability** - Use mail-tester.com
5. **Monitor reports** - Set up DMARC aggregate reports

## Next Steps

- [CI/CD Workflows](./ci-cd) - Automated deployments
- [Managing Zones](./zones) - Zone configuration

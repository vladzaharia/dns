# Mail Providers

API reference for email provider helpers.

## Fastmail

### createFastmailRecords

Creates all Fastmail DNS records for a domain.

```typescript
function createFastmailRecords(options: FastmailOptions): DomainModifier[]
```

#### FastmailOptions

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

#### Generated Records

| Record | Type | Purpose |
|--------|------|---------|
| `mail` | CNAME | Webmail access |
| `@` | MX (10) | Primary mail server |
| `@` | MX (20) | Secondary mail server |
| `*` | MX | Subdomain mail (if enabled) |
| `@` | TXT | SPF record |
| `_dmarc` | TXT | DMARC policy |
| `fm1._domainkey` | CNAME | DKIM key 1 |
| `fm2._domainkey` | CNAME | DKIM key 2 |
| `fm3._domainkey` | CNAME | DKIM key 3 |

### createFastmailSubdomainRecords

Creates Fastmail records for a subdomain.

```typescript
function createFastmailSubdomainRecords(
  domain: string,
  subdomain: string
): DomainModifier[]
```

## Cloudflare Email Routing

### createCloudflareEmailRecords

Creates Cloudflare Email Routing records.

```typescript
function createCloudflareEmailRecords(): DomainModifier[]
```

## Postal (Self-Hosted)

### createPostalRecords

Creates Postal self-hosted email records.

```typescript
function createPostalRecords(options: PostalOptions): DomainModifier[]
```

#### PostalOptions

```typescript
interface PostalOptions {
  /** Domain name */
  domain: string;

  /** Postal server hostname */
  postalHostname: string;

  /** Return path subdomain */
  returnPath: string;

  /** DKIM public key */
  dkimKey: string;
}
```

## Example

```typescript
import { createFastmailRecords } from "./mail/fastmail.js";

createDomain(
  { name: "example.com", category: "personal" },

  // Add all Fastmail records
  ...createFastmailRecords({
    domain: "example.com",
    dmarcPolicy: "quarantine",
  }),

  // Other records...
);
```

## See Also

- [Email Configuration Guide](../guides/mail) - Setup guide
- [Record Builders](./records) - Manual record creation

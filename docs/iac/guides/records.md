# Creating Records

This guide covers how to create DNS records using Polaris DNS record builders.

## Record Builder Functions

All record builders are imported from `../../lib/record.js`:

```typescript
import {
  createARecord,
  createAAAARecord,
  createCNAMERecord,
  createMXRecord,
  createTXTRecord,
  createCAARecord,
  createSRVRecord,
} from "../../lib/record.js";
```

## Address Records

### A Record (IPv4)

```typescript
// Basic A record
createARecord("@", "192.0.2.1")

// With TTL
createARecord("www", "192.0.2.1", { ttl: 300 })

// With Cloudflare proxy
createARecord("@", "192.0.2.1", { proxy: "on" })
```

### AAAA Record (IPv6)

```typescript
createAAAARecord("@", "2001:db8::1")
createAAAARecord("ipv6", "2001:db8::2", { ttl: 300 })
```

## Alias Records

### CNAME Record

```typescript
// Point to another domain
createCNAMERecord("www", "@")

// Point to external service
createCNAMERecord("blog", "hashnode.network.")

// With proxy (Cloudflare)
createCNAMERecord("app", "myapp.herokuapp.com.", { proxy: "on" })
```

::: warning
CNAME records cannot coexist with other records at the same name.
Don't use CNAME at the apex (`@`) - use A/AAAA or ALIAS instead.
:::

## Mail Records

### MX Record

```typescript
// Primary mail server
createMXRecord("@", 10, "mail.example.com.")

// Multiple mail servers with priorities
createMXRecord("@", 10, "mail.example.com.")
createMXRecord("@", 20, "mail2.example.com.")
createMXRecord("@", 30, "backup.mail.com.")
```

### Common Email Provider Records

```typescript
// Google Workspace
createMXRecord("@", 1, "aspmx.l.google.com.")
createMXRecord("@", 5, "alt1.aspmx.l.google.com.")

// Fastmail
createMXRecord("@", 10, "in1-smtp.messagingengine.com.")
createMXRecord("@", 20, "in2-smtp.messagingengine.com.")
```

## Text Records

### TXT Record

```typescript
// Simple TXT record
createTXTRecord("@", "v=spf1 include:_spf.google.com ~all")

// Domain verification
createTXTRecord("@", "google-site-verification=abc123")

// DKIM record
createTXTRecord("selector._domainkey", "v=DKIM1; k=rsa; p=MIIBIjAN...")
```

### SPF Records

```typescript
// SPF for Google Workspace
createTXTRecord("@", "v=spf1 include:_spf.google.com ~all")

// SPF for Fastmail
createTXTRecord("@", "v=spf1 include:spf.messagingengine.com ~all")

// Multiple includes
createTXTRecord("@", "v=spf1 include:_spf.google.com include:sendgrid.net ~all")
```

### DMARC Records

```typescript
createTXTRecord("_dmarc", "v=DMARC1; p=reject; rua=mailto:dmarc@example.com")
```

## Security Records

### CAA Record

Control which CAs can issue certificates:

```typescript
// Allow Let's Encrypt
createCAARecord("@", "issue", "letsencrypt.org")

// Allow Amazon
createCAARecord("@", "issue", "amazon.com")

// Disallow wildcard certificates
createCAARecord("@", "issuewild", ";")

// Report violations
createCAARecord("@", "iodef", "mailto:security@example.com")
```

## Service Records

### SRV Record

```typescript
// SIP service
createSRVRecord("_sip._tcp", 10, 5, 5060, "sipserver.example.com.")

// XMPP
createSRVRecord("_xmpp-client._tcp", 5, 0, 5222, "xmpp.example.com.")

// Minecraft
createSRVRecord("_minecraft._tcp", 0, 0, 25565, "mc.example.com.")
```

## Record Options

### Common Options

```typescript
interface RecordOptions {
  /** Time to live in seconds */
  ttl?: number;
  
  /** Cloudflare proxy status */
  proxy?: "on" | "off";
  
  /** Custom metadata */
  meta?: Record<string, unknown>;
}
```

### Examples with Options

```typescript
// All options
createARecord("api", "192.0.2.1", {
  ttl: 60,
  proxy: "off",
  meta: { comment: "API server" }
})

// TTL only
createCNAMERecord("docs", "gitbook.io.", { ttl: 3600 })
```

## Best Practices

1. **Use descriptive comments** - Document why records exist
2. **Group by purpose** - Organize records logically (web, mail, services)
3. **Use appropriate TTLs** - Lower for frequently changing records
4. **Validate IPs** - Ensure IP addresses are correct before pushing

## Next Steps

- [Service Definitions](./services) - Create reusable services
- [Email Configuration](./mail) - Set up email providers

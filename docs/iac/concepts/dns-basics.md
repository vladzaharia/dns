# DNS Fundamentals

A comprehensive guide to DNS concepts for working with Polaris DNS.

## What is DNS?

The **Domain Name System (DNS)** is the internet's phone book. It translates human-readable domain names (like `example.com`) into IP addresses (like `192.0.2.1`) that computers use to communicate.

## How DNS Works

### DNS Resolution Process

```
1. User types "example.com" in browser
         ↓
2. Browser checks local cache
         ↓
3. OS checks its DNS cache
         ↓
4. Query sent to recursive resolver (ISP/Google/Cloudflare)
         ↓
5. Resolver queries root nameservers
         ↓
6. Root directs to .com TLD nameservers
         ↓
7. TLD directs to example.com authoritative nameservers
         ↓
8. Authoritative server returns IP address
         ↓
9. IP cached at each level, returned to browser
```

### DNS Hierarchy

```
                    Root (.)
                       │
        ┌──────────────┼──────────────┐
        │              │              │
      .com           .org           .net
        │              │              │
    example        wikipedia       github
        │              │              │
      www            en            api
```

## Record Types

### Address Records

#### A Record (IPv4)

Maps a hostname to an IPv4 address.

```typescript
createARecord("@", "192.0.2.1"); // Root domain
createARecord("www", "192.0.2.1"); // Subdomain
createARecord("api", "192.0.2.2"); // Different IP
```

#### AAAA Record (IPv6)

Maps a hostname to an IPv6 address.

```typescript
createAAAARecord("@", "2001:db8::1");
createAAAARecord("ipv6", "2001:db8::2");
```

### Alias Records

#### CNAME Record

Creates an alias pointing to another hostname.

```typescript
createCNAMERecord("www", "@"); // Points to root
createCNAMERecord("blog", "hashnode.network."); // External service
```

::: warning
CNAME records cannot coexist with other record types at the same name.
Never use CNAME at the apex (root) domain.
:::

### Mail Records

#### MX Record

Specifies mail servers for the domain.

```typescript
createMXRecord("@", 10, "mail1.example.com."); // Primary (priority 10)
createMXRecord("@", 20, "mail2.example.com."); // Backup (priority 20)
```

Lower priority numbers = higher preference.

### Text Records

#### TXT Record

Stores arbitrary text data, commonly used for:

- **SPF** - Email sender verification
- **DKIM** - Email signing
- **DMARC** - Email policy
- **Domain verification** - Proving ownership

```typescript
// SPF record
createTXTRecord("@", "v=spf1 include:_spf.google.com ~all");

// Domain verification
createTXTRecord("@", "google-site-verification=abc123");

// DMARC policy
createTXTRecord("_dmarc", "v=DMARC1; p=reject; rua=mailto:dmarc@example.com");
```

### Security Records

#### CAA Record

Specifies which Certificate Authorities can issue certificates.

```typescript
createCAARecord("@", "issue", "letsencrypt.org");
createCAARecord("@", "issuewild", ";"); // Disallow wildcards
createCAARecord("@", "iodef", "mailto:security@example.com");
```

### Service Records

#### SRV Record

Specifies location of services.

```typescript
// Format: _service._protocol priority weight port target
createSRVRecord("_sip._tcp", 10, 5, 5060, "sipserver.example.com.");
createSRVRecord("_minecraft._tcp", 0, 0, 25565, "mc.example.com.");
```

## TTL (Time to Live)

TTL specifies how long records are cached (in seconds).

| TTL   | Duration  | Use Case          |
| ----- | --------- | ----------------- |
| 60    | 1 minute  | Failover, testing |
| 300   | 5 minutes | Dynamic content   |
| 3600  | 1 hour    | Standard records  |
| 86400 | 1 day     | Stable records    |

```typescript
// Low TTL for frequently changing records
createARecord("status", "192.0.2.1", { ttl: 60 });

// Standard TTL
createARecord("www", "192.0.2.1", { ttl: 3600 });
```

::: tip
Cloudflare's automatic TTL (value `1`) is recommended for proxied records.
:::

## DNS Propagation

When you change DNS records, the changes don't take effect immediately:

1. **Old records remain cached** until TTL expires
2. **Different resolvers** may have different cached values
3. **Full propagation** can take 24-48 hours (worst case)

### Best Practices

- Lower TTL before making changes
- Wait for old TTL to expire
- Make changes
- Verify propagation
- Restore normal TTL

## Next Steps

- [DNSControl Overview](./dnscontrol) - Learn the underlying tool
- [Architecture](./architecture) - Polaris DNS architecture

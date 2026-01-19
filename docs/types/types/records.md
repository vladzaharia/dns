# Record Types

This page documents the TypeScript types for all DNS record functions provided by `@vladzaharia/dnscontrol-types`.

## Standard Records

### A Record

Creates an IPv4 address record.

```typescript
declare function A(name: string, ip: string, ...modifiers: RecordModifier[]): DomainModifier;
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | Record name (`@` for apex, or subdomain) |
| `ip` | `string` | IPv4 address |
| `modifiers` | `RecordModifier[]` | Optional TTL, metadata |

**Example:**

```typescript
(A("@", "192.0.2.1"),
  A("www", "192.0.2.1", TTL(300)),
  A("api", "192.0.2.2", TTL(60), { comment: "API server" }));
```

### AAAA Record

Creates an IPv6 address record.

```typescript
declare function AAAA(name: string, ip: string, ...modifiers: RecordModifier[]): DomainModifier;
```

**Example:**

```typescript
(AAAA("@", "2001:db8::1"), AAAA("ipv6", "2001:db8::2", TTL(300)));
```

### CNAME Record

Creates a canonical name (alias) record.

```typescript
declare function CNAME(
  name: string,
  target: string,
  ...modifiers: RecordModifier[]
): DomainModifier;
```

::: warning
CNAME records cannot coexist with other record types at the same name. Use ALIAS for apex domains.
:::

**Example:**

```typescript
(CNAME("www", "@"), CNAME("blog", "hashnode.network."), CNAME("docs", "docs.gitbook.com."));
```

### MX Record

Creates a mail exchange record.

```typescript
declare function MX(
  name: string,
  priority: number,
  target: string,
  ...modifiers: RecordModifier[]
): DomainModifier;
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `priority` | `number` | Mail server priority (lower = higher priority) |
| `target` | `string` | Mail server hostname (must end with `.`) |

**Example:**

```typescript
(MX("@", 10, "mail.example.com."),
  MX("@", 20, "mail2.example.com."),
  MX("@", 30, "mail-backup.example.com."));
```

### TXT Record

Creates a text record.

```typescript
declare function TXT(
  name: string,
  contents: string | string[],
  ...modifiers: RecordModifier[]
): DomainModifier;
```

**Example:**

```typescript
// Single string
(TXT("@", "v=spf1 include:_spf.google.com ~all"),
  // Long TXT record (auto-split into 255-char chunks)
  TXT("_dmarc", "v=DMARC1; p=reject; rua=mailto:dmarc@example.com"),
  // Array of strings (for DKIM and other long records)
  TXT("selector._domainkey", ["v=DKIM1; k=rsa; p=", "MIIBIjANBgkq..."]));
```

### NS Record

Creates a nameserver record.

```typescript
declare function NS(name: string, target: string, ...modifiers: RecordModifier[]): DomainModifier;
```

**Example:**

```typescript
(NS("@", "ns1.example.com."), NS("@", "ns2.example.com."), NS("subdomain", "ns1.otherdns.com.")); // Delegate subdomain
```

## Extended Records

### CAA Record

Creates a Certification Authority Authorization record.

```typescript
declare function CAA(
  name: string,
  tag: "issue" | "issuewild" | "iodef",
  value: string,
  ...modifiers: RecordModifier[]
): DomainModifier;
```

**Example:**

```typescript
(CAA("@", "issue", "letsencrypt.org"),
  CAA("@", "issuewild", ";"), // Disallow wildcard certs
  CAA("@", "iodef", "mailto:security@example.com"));
```

### SRV Record

Creates a service location record.

```typescript
declare function SRV(
  name: string,
  priority: number,
  weight: number,
  port: number,
  target: string,
  ...modifiers: RecordModifier[]
): DomainModifier;
```

**Example:**

```typescript
(SRV("_sip._tcp", 10, 5, 5060, "sipserver.example.com."),
  SRV("_minecraft._tcp", 0, 0, 25565, "mc.example.com."));
```

### HTTPS/SVCB Records

Creates HTTPS or SVCB service binding records.

```typescript
declare function HTTPS(
  name: string,
  priority: number,
  target: string,
  params?: string,
  ...modifiers: RecordModifier[]
): DomainModifier;

declare function SVCB(
  name: string,
  priority: number,
  target: string,
  params?: string,
  ...modifiers: RecordModifier[]
): DomainModifier;
```

**Example:**

```typescript
(HTTPS("@", 1, ".", "alpn=h2,h3"),
  SVCB("_dns.resolver", 1, "dns.example.com.", "alpn=h2 dohpath=/dns-query"));
```

## Pseudo Records

### ALIAS Record

Creates an ALIAS record (ANAME/flattened CNAME for apex).

```typescript
declare function ALIAS(
  name: string,
  target: string,
  ...modifiers: RecordModifier[]
): DomainModifier;
```

**Example:**

```typescript
ALIAS("@", "myapp.herokuapp.com."); // Works at apex!
```

## Full Reference

For a complete list of all record types and their parameters, see the [API Reference](../api/).

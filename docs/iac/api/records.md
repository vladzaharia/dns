# Record Builders

API reference for DNS record builder functions.

## Address Records

### createARecord

Creates an A record (IPv4 address).

```typescript
function createARecord(name: string, ip: string, options?: RecordOptions): DomainModifier;
```

| Parameter | Type            | Description                |
| --------- | --------------- | -------------------------- |
| `name`    | `string`        | Record name (`@` for apex) |
| `ip`      | `string`        | IPv4 address               |
| `options` | `RecordOptions` | Optional modifiers         |

### createAAAARecord

Creates an AAAA record (IPv6 address).

```typescript
function createAAAARecord(name: string, ip: string, options?: RecordOptions): DomainModifier;
```

## Alias Records

### createCNAMERecord

Creates a CNAME record (canonical name).

```typescript
function createCNAMERecord(name: string, target: string, options?: RecordOptions): DomainModifier;
```

## Mail Records

### createMXRecord

Creates an MX record (mail exchange).

```typescript
function createMXRecord(
  name: string,
  priority: number,
  target: string,
  options?: RecordOptions
): DomainModifier;
```

| Parameter  | Type            | Description          |
| ---------- | --------------- | -------------------- |
| `name`     | `string`        | Record name          |
| `priority` | `number`        | Mail server priority |
| `target`   | `string`        | Mail server hostname |
| `options`  | `RecordOptions` | Optional modifiers   |

## Text Records

### createTXTRecord

Creates a TXT record.

```typescript
function createTXTRecord(name: string, content: string, options?: RecordOptions): DomainModifier;
```

## Security Records

### createCAARecord

Creates a CAA record (Certificate Authority Authorization).

```typescript
function createCAARecord(
  name: string,
  tag: "issue" | "issuewild" | "iodef",
  value: string,
  options?: RecordOptions
): DomainModifier;
```

## Service Records

### createSRVRecord

Creates an SRV record (service location).

```typescript
function createSRVRecord(
  name: string,
  priority: number,
  weight: number,
  port: number,
  target: string,
  options?: RecordOptions
): DomainModifier;
```

### createServiceRecord

Creates a record pointing to a server from the registry.

```typescript
function createServiceRecord(
  subdomain: string,
  server: ServerName,
  options?: ServiceRecordOptions
): DomainModifier;
```

## Types

### RecordOptions

```typescript
interface RecordOptions {
  proxy?: ProxyStatus; // "on" | "off" | "full"
  ttl?: number;
}
```

### ServiceRecordOptions

```typescript
interface ServiceRecordOptions {
  proxy?: ProxyStatus;
  useTunnel?: boolean;
  ttl?: number;
}
```

## See Also

- [Domain Builders](./domains) - Create domains
- [Creating Records Guide](../guides/records) - Usage guide

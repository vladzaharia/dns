# DSL Types

Type definitions for DNSControl domain-specific language.

## Core Functions

### D (Domain)

Main function for defining a domain.

```typescript
declare function D(name: string, registrar: Registrar, ...modifiers: DomainModifier[]): void;
```

### DEFAULTS

Set default values for subsequent domains.

```typescript
declare function DEFAULTS(...modifiers: DomainModifier[]): void;
```

### DOMAIN_ELSEWHERE

Reference a domain managed elsewhere.

```typescript
declare function DOMAIN_ELSEWHERE(name: string, registrar: Registrar, dnsProvider: string[]): void;
```

### DOMAIN_ELSEWHERE_AUTO

Auto-detect nameservers for external domain.

```typescript
declare function DOMAIN_ELSEWHERE_AUTO(name: string, registrar: Registrar): void;
```

## Record Functions

### A, AAAA

Address records.

```typescript
declare function A(name: string, ip: string, ...modifiers: RecordModifier[]): DomainModifier;
declare function AAAA(name: string, ip: string, ...modifiers: RecordModifier[]): DomainModifier;
```

### CNAME

Canonical name records.

```typescript
declare function CNAME(
  name: string,
  target: string,
  ...modifiers: RecordModifier[]
): DomainModifier;
```

### MX

Mail exchange records.

```typescript
declare function MX(
  name: string,
  priority: number,
  target: string,
  ...modifiers: RecordModifier[]
): DomainModifier;
```

### TXT

Text records.

```typescript
declare function TXT(name: string, content: string, ...modifiers: RecordModifier[]): DomainModifier;
```

### CAA

Certificate Authority Authorization.

```typescript
declare function CAA(
  name: string,
  tag: CAATag,
  value: string,
  ...modifiers: RecordModifier[]
): DomainModifier;
```

### SRV

Service records.

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

## Record Modifiers

### TTL

Set time-to-live.

```typescript
declare function TTL(seconds: number): RecordModifier;
```

### CF_PROXY_ON / CF_PROXY_OFF

Cloudflare proxy control.

```typescript
declare function CF_PROXY_ON(): RecordModifier;
declare function CF_PROXY_OFF(): RecordModifier;
```

### IGNORE

Ignore during sync.

```typescript
declare function IGNORE(pattern: string): DomainModifier;
```

## See Also

- [Record Types](./records) - Record definitions
- [Domain Types](./domains) - Domain structures

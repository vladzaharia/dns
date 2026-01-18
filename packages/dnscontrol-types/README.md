# @vladzaharia/dnscontrol-types

TypeScript type definitions for [DNSControl](https://docs.dnscontrol.org/) DSL.

## Installation

```bash
npm install --save-dev @vladzaharia/dnscontrol-types
```

## Usage

Add a reference to the types in your DNSControl configuration files:

```typescript
/// <reference types="@vladzaharia/dnscontrol-types" />

var REG_NONE = NewRegistrar("none");
var DNS_CF = NewDnsProvider("cloudflare");

D("example.com", REG_NONE, DnsProvider(DNS_CF),
  A("@", "192.0.2.1"),
  AAAA("@", "2001:db8::1"),
  CNAME("www", "@"),
  MX("@", 10, "mail.example.com."),
  TXT("@", "v=spf1 include:_spf.example.com ~all")
);
```

Or configure in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@vladzaharia/dnscontrol-types"]
  }
}
```

## What's Included

### Core Types
- `Ttl` - TTL values (number or string like "1h")
- `DomainModifier` - Return type for record and domain functions
- `RecordModifier` - Return type for TTL and provider-specific modifiers

### Top-Level Functions
- `D()` - Define a domain
- `D_EXTEND()` - Extend an existing domain
- `DEFAULTS()` - Set default modifiers
- `NewRegistrar()` - Create a registrar
- `NewDnsProvider()` - Create a DNS provider

### DNS Record Types
All standard DNS record types are supported:
- **Address**: `A`, `AAAA`
- **Alias**: `ALIAS`, `CNAME`, `DNAME`
- **Mail**: `MX`
- **Service**: `SRV`, `SVCB`, `HTTPS`, `NAPTR`
- **Security**: `CAA`, `TLSA`, `SSHFP`, `DNSKEY`, `DS`, `SMIMEA`, `OPENPGPKEY`
- **Text**: `TXT`
- **Other**: `NS`, `PTR`, `SOA`, `LOC`, `DHCID`, `RP`
- **Pseudo**: `FRAME`, `URL`, `URL301`

### Builder Functions
- `SPF_BUILDER()` - Build SPF records
- `DMARC_BUILDER()` - Build DMARC records
- `DKIM_BUILDER()` - Build DKIM records
- `CAA_BUILDER()` - Build CAA records
- `M365_BUILDER()` - Build Microsoft 365 records
- `LOC_BUILDER_*()` - Build LOC records

### Provider-Specific Types

#### Cloudflare
- `CF_PROXY_ON`, `CF_PROXY_OFF`
- `CF_REDIRECT()`, `CF_TEMP_REDIRECT()`
- `CF_SINGLE_REDIRECT()`
- `CF_WORKER_ROUTE()`

#### AWS Route53
- `R53_ALIAS()`
- `R53_ZONE()`
- Routing policies: `R53_WEIGHT()`, `R53_GEO()`, `R53_FAILOVER()`

#### Azure DNS
- `AZURE_ALIAS()`

#### Others
- PowerDNS: `LUA()`
- ClouDNS: `CLOUDNS_WR()`
- NS1: `NS1_URLFWD()`
- Gandi: `GANDI_V5_ALIAS()`

## Documentation

For complete DNSControl documentation, see [docs.dnscontrol.org](https://docs.dnscontrol.org/).

## License

MIT


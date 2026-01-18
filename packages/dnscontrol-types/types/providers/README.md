# DNSControl Provider Type Definitions

This directory contains TypeScript type definitions for all DNS providers supported by DNSControl.

## Overview

DNSControl supports **59+ DNS providers**, each with varying capabilities and features. This package provides comprehensive TypeScript type definitions for all providers, including:

- Standard DNS record types (A, AAAA, CNAME, MX, NS, TXT, etc.)
- Modern DNS record types (CAA, SRV, SSHFP, TLSA, HTTPS, SVCB, etc.)
- Provider-specific custom record types
- Provider capabilities and limitations

## Provider Categories

### Tier 1: Providers with Custom Record Types (16 providers)

These providers offer provider-specific custom record types beyond standard DNS records:

- **AdGuard Home** - Passthrough records for selective DNS filtering
- **Akamai Edge DNS** - CDN and Traffic Load Controller records
- **Azure DNS / Azure Private DNS** - Azure resource aliases
- **Bunny DNS** - Redirect records
- **Cloudflare** - Worker routes, redirects, proxy control
- **ClouDNS** - Web redirect records
- **deSEC** - URL redirect records
- **DNSimple** - URL records
- **Gandi v5** - LiveDNS ALIAS records
- **Hurricane Electric DNS (HEDNS)** - Null MX records
- **Namecheap** - URL redirects and frame records
- **Netlify** - IPv4/IPv6 redirect records
- **NS1** - URL forwarding
- **Porkbun** - URL forwarding and redirects
- **PowerDNS** - Lua scripting for dynamic responses
- **Route 53** - AWS resource aliases and advanced routing

### Tier 2: Full-Featured Providers (20 providers)

Providers with comprehensive DNS record type support including modern records:

- DigitalOcean, Domainnameshop, Exoscale, Google Cloud DNS, Gcore
- Hetzner (legacy), Hetzner v2, Hosting.de, Huawei Cloud, INWX
- Linode, Name.com, Netcup, Oracle Cloud, OVH
- Packetframe, Realtime Register, Sakura Cloud, TransIP, Vultr

### Tier 3: Standard Providers (20 providers)

Providers with standard DNS capabilities:

- AliDNS, AutoDNS, AXFR+DDNS, BIND, CNR
- CSC Global, DNS Made Easy, DNS-over-HTTPS, DNScale, Dynadot
- Easyname, Fortigate, Hexonet, Joker, Loopia
- LuaDNS, Mythic Beasts, RWTH DNS-Admin, SoftLayer, Vercel

### Tier 4: Basic/Registrar Providers (2 providers)

Providers with basic DNS capabilities or primarily registrar functionality:

- Internet.bs, OpenSRS

## Usage

### Importing Provider Types

All provider types are automatically included when you import the main DNSControl types:

```typescript
/// <reference types="@vladzaharia/dnscontrol-types" />

// Provider-specific functions are now available
D("example.com", REG_NONE, DnsProvider(DSP_CLOUDFLARE),
  A("@", "1.2.3.4"),
  CF_PROXY_ON(),  // Cloudflare-specific
  END
);
```

### Provider-Specific Functions

Each provider file documents its specific capabilities. For example:

**Cloudflare** (`cloudflare.d.ts`):
- `CF_PROXY_ON()` / `CF_PROXY_OFF()` - Proxy control
- `CF_WORKER_ROUTE()` - Worker routes
- `CF_REDIRECT()` / `CF_TEMP_REDIRECT()` - Page rule redirects
- `CF_SINGLE_REDIRECT()` - Bulk redirects

**Route 53** (`route53.d.ts`):
- `R53_ALIAS()` - AWS resource aliases
- `R53_ZONE()` - Hosted zone specification
- `R53_FAILOVER()` - Failover routing
- `R53_WEIGHT()` - Weighted routing
- `R53_GEO()` - Geolocation routing

**Azure DNS** (`azure.d.ts`):
- `AZURE_ALIAS()` - Azure resource aliases

## Capability Documentation

Each provider file includes comprehensive JSDoc documentation with:

- **Supported Record Types**: Which DNS record types are supported
- **Features**: Auto DNSSEC, domain creation, dual host support, etc.
- **Custom Record Types**: Provider-specific functions
- **Maintainer**: GitHub handle of the provider maintainer
- **Notes**: Special considerations or limitations

Example from `cloudflare.d.ts`:

```typescript
/**
 * @provider CLOUDFLAREAPI
 * @maintainer @StackExchange
 * 
 * ## Capabilities
 * 
 * ### Supported Record Types
 * - ✅ A, AAAA, CNAME, MX, NS, TXT, SOA, PTR
 * - ✅ CAA, SRV, SSHFP, TLSA, HTTPS, SVCB
 * - ✅ DNSKEY, DS, NAPTR, LOC, SMIMEA, OPENPGPKEY, DNAME
 * 
 * ### Features
 * - ✅ Auto DNSSEC: Supported
 * - ✅ Can Create Domains: Yes
 * - ✅ Dual Host: Yes
 * - ✅ Officially Supported: Yes
 */
```

## Contributing

When adding or updating provider types:

1. Follow the existing file structure and naming conventions
2. Include comprehensive JSDoc documentation
3. Document all capabilities and limitations
4. Add the provider reference to `index.d.ts`
5. Update this README if adding a new provider category

## Resources

- [DNSControl Documentation](https://docs.dnscontrol.org/)
- [DNSControl GitHub Repository](https://github.com/StackExchange/dnscontrol)
- [Provider Capabilities Matrix](../PROVIDER_CAPABILITIES.md)

## License

This package follows the same license as DNSControl.


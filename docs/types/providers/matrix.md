# Provider Feature Matrix

Comparison of DNS provider capabilities.

## Overview

Different DNS providers support different features. This matrix helps you choose the right provider for your needs.

## Provider Comparison

### Record Type Support

| Provider | A | AAAA | CNAME | MX | TXT | CAA | SRV | NS | ALIAS |
|----------|---|------|-------|----|----|-----|-----|----|----|
| Cloudflare | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Route53 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Google Cloud | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Azure DNS | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| DigitalOcean | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| BIND | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |

### Feature Support

| Provider | Proxy/CDN | DNSSEC | Geo Routing | Health Checks | API |
|----------|-----------|--------|-------------|---------------|-----|
| Cloudflare | ✅ | ✅ | ❌ | ❌ | ✅ |
| Route53 | ❌ | ✅ | ✅ | ✅ | ✅ |
| Google Cloud | ❌ | ✅ | ✅ | ❌ | ✅ |
| Azure DNS | ❌ | ✅ | ✅ | ✅ | ✅ |
| DigitalOcean | ❌ | ❌ | ❌ | ❌ | ✅ |
| BIND | ❌ | ✅ | ❌ | ❌ | ❌ |

### Pricing Comparison

| Provider | Zones | Records | Queries |
|----------|-------|---------|---------|
| Cloudflare | Free | Unlimited | Unlimited |
| Route53 | $0.50/zone | $0.0015/record | $0.40/M |
| Google Cloud | $0.20/zone | Included | $0.40/M |
| Azure DNS | $0.50/zone | $0.0005/record | $0.40/M |
| DigitalOcean | Free | Unlimited | Unlimited |

## Provider-Specific Features

### Cloudflare

- **Proxy (Orange Cloud)**: CDN, DDoS protection, SSL
- **Workers**: Edge compute
- **Page Rules**: URL redirects, caching
- **Firewall**: WAF, rate limiting

### Route53

- **Alias Records**: Point to AWS resources
- **Geolocation Routing**: Route by location
- **Health Checks**: Monitor endpoints
- **Failover**: Automatic failover

### Google Cloud DNS

- **Private Zones**: Internal DNS
- **Forwarding**: Conditional forwarding
- **Peering**: Cross-project DNS

### Azure DNS

- **Private Zones**: VNet DNS
- **Alias Records**: Azure resources
- **Traffic Manager**: Load balancing

## Choosing a Provider

### Use Cloudflare If

- You need CDN and caching
- You want DDoS protection
- You need free SSL
- You have simple DNS needs

### Use Route53 If

- You're using AWS infrastructure
- You need geolocation routing
- You need health checks
- You need alias records to AWS

### Use Multiple Providers If

- You need redundancy
- Different zones have different needs
- You're migrating providers

## See Also

- [Cloudflare](./cloudflare) - Cloudflare setup
- [Route53](./route53) - AWS Route53 setup
- [Provider Support](./index) - All providers


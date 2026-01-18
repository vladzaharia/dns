# Domain Configurations

## Active Domains

### polaris.gdn (src/zones/polaris-gdn.ts)
**Purpose**: Primary infrastructure domain with core server records

**Provider**: Cloudflare (CloudflareDns)

**Key Features**:
- Core server A records (AzureGateway, UpVpn, Reprise1-4)
- Infrastructure services
- Homelab services
- Internal services with `.local` suffix
- Postal mail service records
- Cloudflare Pages integration (charge subdomain)

**Ignored Records**:
- Root domain (@)
- Greenwood and CapHill (DDNS-managed)
- baserow.r2 (CF-managed)

**Mail**: Postal (DKIM keys: heqoqb, zljdej)

---

### polaris.rest (src/zones/polaris-rest.ts)
**Purpose**: Services domain with comprehensive service coverage

**Provider**: Cloudflare (CloudflareDns)

**Key Features**:
- Infrastructure services
- Media services
- Productivity services
- Gaming services
- Internal services with `.int` suffix
- KMS service (SRV record for _vlmcs._tcp)
- Fly.dev integration (uptime subdomain)

**Ignored Records**:
- Root domain (@)
- Greenwood (DDNS-managed)
- assets, webfinger, homedb, status (CF-managed)
- s3.chat, dndbeyond.chat (CF-managed)

**Mail**: Postal (DKIM key: tydbrf)

**Domain Verification**:
- Tailscale
- Microsoft (MS=ms74686894)
- OpenAI

---

### polaris.video (src/zones/polaris-video.ts)
**Purpose**: Media streaming and automation services

**Provider**: Cloudflare (CloudflareDns)

**Key Features**:
- Plex media server
- *arr stack (Sonarr, Radarr, Lidarr, Readarr, Prowlarr)
- IPTV services (xTeVe, Threadfin, Tunarr)
- Media management (Overseerr, Wizarr, Maintainerr, Tautulli)
- Download tools (SabNZBd, Decryptarr, MeTube)
- Automation (n8n flows)

**Ignored Records**:
- status (CF-managed)
- cf2024-1._domainkey (CF-managed)

**Mail**: Postal (DKIM key: wedj3o)

---

### zhr.one (src/zones/zhr-one.ts)
**Purpose**: Infrastructure services domain

**Provider**: Cloudflare (CloudflareDns)

**Key Features**:
- Infrastructure services
- KMS service (SRV record for _vlmcs._tcp)

**Ignored Records**:
- Root domain (@)
- cf2024-1._domainkey (CF-managed)

**Mail**: Fastmail

**Domain Verification**:
- Atlassian
- Keybase
- Microsoft (MS=ms62227587, MS=ms10317245)
- Doppler

---

### vlad.gg (src/zones/vlad-gg.ts)
**Purpose**: Personal website and services

**Provider**: Cloudflare (CloudflareDns)

**Key Features**:
- Netlify integration (root and www)
- Fly.dev API (api subdomain)
- Personal services (Vaultwarden, Plane, Blinko)
- Dropshare with AWS ACM validation
- CAA record for Amazon

**Ignored Records**:
- status (CF-managed)
- cf2024-1._domainkey (CF-managed)
- drop, pkmn (CF-managed)
- assassin, *.assassin (CF-managed)
- track, *.track (CF-managed)

**Mail**: 
- Fastmail (root domain)
- Fastmail (ds subdomain)

**Domain Verification**:
- Keybase
- Google
- OpenAI
- Doppler

---

### vlad.lgbt (src/zones/vlad-lgbt.ts)
**Purpose**: Redirect domain to vlad.gg

**Provider**: Cloudflare with redirects (CloudflareDnsWithRedirect)

**Key Features**:
- Wildcard redirect: `*vlad.lgbt/*` → `https://vlad.gg/$2`
- Bluesky AT Protocol verification

**Ignored Records**:
- Root domain (@)
- www (CF-managed)
- cf2024-1._domainkey (CF-managed)

**Mail**: Fastmail

**Domain Verification**:
- Bluesky (_atproto TXT record)

---

### zaharia.email (src/zones/zaharia-email.ts)
**Purpose**: Email-only domain

**Provider**: Cloudflare (CloudflareDns)

**Key Features**:
- Email only, no service records

**Mail**: Fastmail

**Domain Verification**:
- Microsoft (MS=ms66850642)

---

## Inactive Domains

### polaris.express (src/zones/polaris-express.ts)
**Status**: DISABLED - All code commented out

**Notes**: Previously configured for Cloudflare Pages and Postal mail. Currently not in use.

---

## Common Patterns Across Domains

### Default TTL
All domains use `DefaultTTL(1)` for fast propagation.

### Registrar
All domains use `NoRegistrar` as they are DNS-only (not registered through DNSControl).

### Cloudflare-Managed Records
Most domains ignore certain records managed directly in Cloudflare UI:
- Root domain (@) - Often managed for redirects or special configurations
- status subdomains - Usually BetterUptime or similar monitoring
- cf2024-1._domainkey - Cloudflare Email Routing DKIM

### DDNS-Managed Records
Home IP addresses (Greenwood, CapHill) are managed by DDNS and ignored in zone files.

### Domain Verification
Most domains include verification TXT records for:
- Microsoft (MS=...)
- Google (google-site-verification=...)
- Keybase (keybase-site-verification=...)
- OpenAI (openai-domain-verification=...)
- Doppler (_doppler_... TXT records)
- Tailscale (TAILSCALE-...)
- Bluesky (_atproto TXT records)

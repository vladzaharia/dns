# Server and Service Inventory

## Server Definitions (src/services/core.ts)

All servers resolve to subdomains of `polaris.gdn`.

| Server Name | Prefix | Location | IP Address | FQDN | Exclude Record | Description |
|------------|--------|----------|------------|------|----------------|-------------|
| Greenwood | gw | sea | 67.185.194.56 | gw.sea.polaris.gdn | Yes | Greenwood Townhouse IP (DDNS-managed) |
| CapHill | ch | sea | 97.113.197.175 | ch.sea.polaris.gdn | Yes | CapHill Townhouse IP (DDNS-managed) |
| AzureGateway | tun | - | 172.179.0.103 | tun.polaris.gdn | No | Azure Tunnel Gateway |
| UpVpn | vpn | - | 20.3.240.145 | vpn.polaris.gdn | No | UpVPN Serverless |
| Reprise1 | re | sea | 104.37.168.87 | re.sea.polaris.gdn | No | Reprise IP1 |
| Reprise2 | re-2 | sea | 104.37.168.88 | re-2.sea.polaris.gdn | No | Reprise IP2 |
| Reprise3 | re-3 | sea | 104.37.168.89 | re-3.sea.polaris.gdn | No | Reprise IP3 |
| Reprise4 | re-4 | sea | 104.37.168.90 | re-4.sea.polaris.gdn | No | Reprise IP4 |
| LocalTraefik | local | - | 10.10.1.20 | local.polaris.gdn | Yes | Internal Traefik services |

## Service Groups

### Infrastructure Services (src/services/infrastructure.ts)
- router (10.10.0.1) - Router
- truenas (10.10.0.10) - TrueNAS
- auth → Greenwood - Authentik/Zitadel
- vault → Greenwood - Hashicorp Vault
- docker (azgw) - Arcane Docker Management
- up (20.64.176.83) - Uptime Kuma
- net → AzureGateway - Polaris Tunnels

### Homelab Services (src/services/homelab.ts)
- code, *.code - Coder
- garage, s3, *.s3 - Garage S3
- k2v - Garage K2V
- d - Dropshare
- log, ingest.log - Seq Logs
- kasm, registry.kasm - Kasm
- registry - Docker Registry
- z, *.z → Reprise4 - Zrok
- ai (azgw) - Librechat

### Media Services (src/services/media-services.ts)
- books - Calibre Web
- calibre - Calibre
- manga - Komga
- stash - Stash

### Productivity Services (src/services/productivity.ts)
- atuin - Atuin Shell History
- cloud - Owncloud
- docs - OnlyOffice
- code, *.code - Coder
- mqtt - Mosquitto mqtt
- chat - OpenWebUI
- kiwix (10.11.2.123) - Kiwix

### Gaming Services (src/services/gaming.ts)
- games (azgw) - Drop
- retro - Romm

### Internal Services (src/services/internal.ts)
Used with `.int` or `.local` suffix for internal network.
- traefik - Traefik
- netbootxyz - NetbootXYZ
- portainer - Portainer
- pgadmin - PGAdmin

### Polaris Video Services (src/services/polaris-video.ts)
Public services:
- media - Plex
- request (azgw) - Overseerr
- invite (azgw) - Wizarr
- xteve (azgw) - xTeVe IPTV
- threadfin (azgw) - Threadfin IPTV
- tunarr (azgw) - Tunarr TV
- logos - IPTV Logos
- guide - Guide2go
- mirror - MagicMirror
- flows - n8n Workflows
- metube - MeTube Downloader

Private services (all azgw):
- maintain - Maintainerr
- rec - Recomendarr
- sonarr - Sonarr
- radarr - Radarr
- lidarr - Lidarr
- readarr - Readarr
- prowlarr - Prowlarr
- sabnzbd - SabNZBd
- decryptarr - Decryptarr
- tautulli - Tautulli Stats

## Mail Providers

### Fastmail (src/services/mail/fastmail.ts)
Used by: zhr.one, vlad.gg, vlad.lgbt, zaharia.email
- MX records: in1-smtp.messagingengine.com (10), in2-smtp.messagingengine.com (20)
- DKIM keys: fm1, fm2, fm3
- SPF: v=spf1 include:spf.messagingengine.com ?all
- DMARC: v=DMARC1; p=none

### Postal (src/services/mail/postal.ts)
Used by: polaris.gdn, polaris.rest, polaris.video
- Domain: post.polaris.gdn
- MX: mx.post.polaris.gdn
- SPF: v=spf1 a mx include:spf.post.polaris.gdn ~all
- DMARC: v=DMARC1; p=none
- DKIM keys vary by domain

## External Integrations

### Netlify (src/services/external/netlify-vladgg.ts)
- vlad.gg root: 75.2.60.5 (proxied)
- www.vlad.gg → vladgg.netlify.app

### Cloudflare Pages (src/services/external/cloudflare-pages.ts)
- charge.polaris.gdn → charging.pages.dev (proxied)

## Special Configurations

### Azure Gateway (azgw flag)
Services with `azgw: true` automatically route through AzureGateway tunnel (tun.polaris.gdn).
Used extensively for internal services exposed externally.

### LocalTraefik
Services targeting LocalTraefik automatically convert to A records pointing to 10.10.1.20.
Used for internal network services.

### DDNS-Managed Records
Greenwood and CapHill IPs are managed by DDNS and ignored in zone files:
```typescript
IGNORE_NAME(GetPrefix("Greenwood"))
IGNORE_NAME(GetPrefix("CapHill"))
```

### Reprise Migration Notes (src/services/REPRISE)
The following subdomains are on Reprise servers but not yet migrated to this DNS configuration:
- cloud.polaris.gdn
- coolify.polaris.gdn
- list.polaris.gdn
- *.test.polaris.gdn

These may need to be added to the configuration in the future.

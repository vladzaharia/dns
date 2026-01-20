# Service Definitions

Services in Polaris DNS provide a way to define reusable configurations that can be deployed across multiple domains.

## What is a Service?

A service represents an application or infrastructure component that needs DNS records. Instead of manually creating records for each domain, you define a service once and deploy it everywhere.

## Service Structure

Services are defined in `src/services/`:

```
src/services/
├── index.ts           # Exports all services
├── types.ts           # Service type definitions
├── core.ts            # Core service utilities
├── infrastructure.ts  # Infrastructure services
├── media-services.ts  # Media/streaming services
├── productivity.ts    # Productivity tools
├── gaming.ts          # Gaming services
└── homelab.ts         # Homelab services
```

## Defining a Service

### Basic Service Definition

```typescript
// src/services/infrastructure.ts

import type { Service } from "./types.js";

export const SERVICES: Service[] = [
  {
    name: "Traefik Dashboard",
    subdomain: "traefik",
    server: "greenwood",
    routing: "proxied",
  },
  {
    name: "Portainer",
    subdomain: "portainer",
    server: "greenwood",
    routing: "proxied",
  },
];
```

### Service Properties

| Property         | Type              | Description                 |
| ---------------- | ----------------- | --------------------------- |
| `name`           | `string`          | Human-readable service name |
| `subdomain`      | `string`          | Subdomain for the service   |
| `server`         | `ServerName`      | Target server from registry |
| `routing`        | `RoutingStrategy` | How traffic is routed       |
| `internal`       | `boolean?`        | Internal-only service       |
| `internalSuffix` | `string?`         | Custom internal suffix      |

### Routing Strategies

| Strategy  | Description              | Record Type         |
| --------- | ------------------------ | ------------------- |
| `direct`  | Direct to server IP      | A record            |
| `proxied` | Through Cloudflare proxy | A record + CF proxy |
| `tunnel`  | Through Azure tunnel     | CNAME to tunnel     |

## Using Services in Zones

### Deploying Services

```typescript
// src/zones/personal/vlad-gg.ts

import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";
import { createServiceRecord } from "../../lib/record.js";
import { INFRASTRUCTURE_SERVICES } from "../../services/infrastructure.js";

export function registerVladGg(): void {
  createDomain(
    {
      name: "vlad.gg",
      category: "personal",
      registrar: NO_REGISTRAR,
      dnsProvider: CLOUDFLARE,
    },

    // Deploy all infrastructure services
    ...INFRASTRUCTURE_SERVICES.map((service) =>
      createServiceRecord(service.subdomain, service.server, {
        proxy: service.routing === "proxied" ? "on" : "off",
        useTunnel: service.routing === "tunnel",
      })
    )

    // Other records...
  );
}
```

### Selective Deployment

```typescript
// Deploy only specific services
const selectedServices = INFRASTRUCTURE_SERVICES.filter((s) =>
  ["traefik", "portainer"].includes(s.subdomain)
);

createDomain(
  { name: "example.com", category: "personal" },
  ...selectedServices.map((service) => createServiceRecord(service.subdomain, service.server))
);
```

## Service Categories

### Infrastructure Services

Core infrastructure components:

- Reverse proxies (Traefik, Nginx)
- Container management (Portainer)
- Monitoring (Grafana, Prometheus)

### Media Services

Media and streaming:

- Plex, Jellyfin
- Sonarr, Radarr
- Overseerr

### Productivity Services

Productivity tools:

- Nextcloud
- Vaultwarden
- Bookstack

## Best Practices

1. **Group related services** - Keep services organized by category
2. **Use consistent naming** - Follow subdomain conventions
3. **Document services** - Add descriptions for each service
4. **Consider routing** - Choose appropriate routing strategy
5. **Test deployments** - Preview before pushing changes

## Next Steps

- [Working with Providers](./providers) - Configure DNS providers
- [Email Configuration](./mail) - Set up email services

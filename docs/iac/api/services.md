# Service Types

API reference for service configuration types.

## Types

### Service

Service definition structure.

```typescript
interface Service {
  /** Human-readable service name */
  readonly name: string;

  /** Subdomain for the service */
  readonly subdomain: string;

  /** Target server from registry */
  readonly server: ServerName;

  /** How traffic is routed */
  readonly routing: RoutingStrategy;

  /** Whether this is an internal-only service */
  readonly internal?: boolean;

  /** Custom suffix for internal services */
  readonly internalSuffix?: string;
}
```

### RoutingStrategy

```typescript
type RoutingStrategy = "direct" | "tunnel" | "proxied";
```

| Strategy | Description | Record Type |
|----------|-------------|-------------|
| `direct` | Direct to server IP | A record |
| `proxied` | Through Cloudflare proxy | A record + CF proxy |
| `tunnel` | Through Azure tunnel | CNAME to tunnel |

### ServiceCategory

```typescript
type ServiceCategory =
  | "infrastructure"
  | "productivity"
  | "media"
  | "gaming"
  | "homelab"
  | "internal";
```

## Service Modules

### Infrastructure Services

Core infrastructure components like reverse proxies and monitoring.

```typescript
import { INFRASTRUCTURE_SERVICES } from "./services/infrastructure.js";
```

### Media Services

Media and streaming services.

```typescript
import { MEDIA_SERVICES } from "./services/media.js";
```

### Productivity Services

Productivity tools and applications.

```typescript
import { PRODUCTIVITY_SERVICES } from "./services/productivity.js";
```

## Example

```typescript
import type { Service } from "./lib/types.js";

const myService: Service = {
  name: "My Application",
  subdomain: "app",
  server: "greenwood",
  routing: "proxied",
};

// Use with createServiceRecord
createServiceRecord(myService.subdomain, myService.server, {
  proxy: myService.routing === "proxied" ? "on" : "off",
});
```

## See Also

- [Server Registry](./servers) - Server definitions
- [Service Definitions Guide](../guides/services) - Usage guide

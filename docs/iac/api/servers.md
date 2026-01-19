# Server Registry

API reference for server registry and utilities.

## Functions

### getServer

Get a server by name.

```typescript
function getServer(name: ServerName): Server;
```

### getServerIP

Get the IP address for a server.

```typescript
function getServerIP(name: ServerName): string;
```

### getServerHostname

Get the hostname for a server.

```typescript
function getServerHostname(name: ServerName): string;
```

### getServerPrefix

Get the prefix for a server.

```typescript
function getServerPrefix(name: ServerName): string;
```

### isServerDDNS

Check if a server uses DDNS.

```typescript
function isServerDDNS(name: ServerName): boolean;
```

### getServersByLocation

Get all servers in a specific location.

```typescript
function getServersByLocation(location: ServerLocation): Server[];
```

### getAllServerNames

Get all server names.

```typescript
function getAllServerNames(): ServerName[];
```

## Types

### Server

```typescript
interface Server {
  readonly name: ServerName;
  readonly location: ServerLocation;
  readonly prefix: string;
  readonly hostname: string;
  readonly ip: string;
  readonly ipv6?: string;
  readonly isDDNS?: boolean;
}
```

### ServerName

```typescript
type ServerName =
  | "greenwood"
  | "caphill"
  | "pangolin"
  | "upvpn"
  | "reprise1"
  | "reprise2"
  | "reprise3"
  | "reprise4"
  | "local-traefik";
```

### ServerLocation

```typescript
type ServerLocation = "sea" | "qnc" | "re" | "local";
```

## Constants

### servers

Central server registry containing all server definitions.

```typescript
export const servers: ServerRegistry;
```

## Example

```typescript
import { getServer, getServerIP, getServersByLocation } from "./lib/server.js";

// Get full server info
const server = getServer("greenwood");
console.log(server.ip); // "67.185.194.56"
console.log(server.hostname); // "gw.sea.plrs.im"

// Get specific properties
const ip = getServerIP("pangolin");

// Get servers by location
const seattleServers = getServersByLocation("sea");
```

## See Also

- [Service Definitions](./services) - Service configurations
- [Record Builders](./records) - Create DNS records

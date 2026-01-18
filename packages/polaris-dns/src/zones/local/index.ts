/**
 * Local domain zone exports
 *
 * Local domains are used for emergency/travel routers and isolated local networks.
 * These domains resolve to local network IPs and are not accessible from the public internet.
 */

import { registerDangerDirect } from "./danger-direct.js";
import { registerDangerDiy } from "./danger-diy.js";

export { registerDangerDirect, registerDangerDiy };

/**
 * Register all local domains
 */
export function registerLocalDomains(): void {
  registerDangerDirect();
  registerDangerDiy();
}

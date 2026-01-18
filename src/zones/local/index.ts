/**
 * Local domain zone exports
 *
 * Local domains are used for emergency/travel routers and isolated local networks.
 * These domains resolve to local network IPs and are not accessible from the public internet.
 */

export { registerDangerDirect } from "./danger-direct.js";
export { registerDangerDiy } from "./danger-diy.js";

/**
 * Register all local domains
 */
export function registerLocalDomains(): void {
  // Import and call registration functions
  const { registerDangerDirect } = require("./danger-direct.js");
  const { registerDangerDiy } = require("./danger-diy.js");

  registerDangerDirect();
  registerDangerDiy();
}

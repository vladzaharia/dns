/**
 * DNS Infrastructure-as-Code
 *
 * Main entry point for DNSControl configuration.
 * This file registers all DNS zones across all domains.
 *
 * @author Vlad Zaharia
 * @version 2.0.0
 */

import { registerAllZones } from "./zones/index.js";

// =============================================================================
// Bootstrap
// =============================================================================

console.log("╔════════════════════════════════════════════════════════════════╗");
console.log("║                    DNS Infrastructure-as-Code                   ║");
console.log("║                         Version 2.0.0                           ║");
console.log("╚════════════════════════════════════════════════════════════════╝");
console.log("");
console.log("Building DNS zones...\n");

// Register all zones
registerAllZones();

console.log("\n════════════════════════════════════════════════════════════════");
console.log("All zones registered. Running DNSControl...");
console.log("════════════════════════════════════════════════════════════════\n");

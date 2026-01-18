/**
 * Zone exports
 *
 * All domain zones organized by category:
 * - Personal: vlad.gg, vlad.lgbt, zaharia.email, jesse.rocks, spunk.dog, famjam.ing
 * - Infrastructure: plrs.im, polaris.gdn, zhr.one
 * - Services: polaris.video, polaris.rest, polaris.express
 * - Local: danger.direct, danger.diy
 */

// Personal domains
export {
  registerVladGG,
  registerVladLGBT,
  registerZahariaEmail,
  registerJesseRocks,
  registerSpunkDog,
  registerFamjamIng,
} from "./personal/index.js";

// Infrastructure domains
export { registerPlrsIm, registerPolarisGdn, registerZhrOne } from "./infrastructure/index.js";

// Service domains
export {
  registerPolarisVideo,
  registerPolarisRest,
  registerPolarisExpress,
} from "./services/index.js";

// Local domains
export { registerDangerDirect, registerDangerDiy } from "./local/index.js";

// Import all registration functions
import {
  registerVladGG,
  registerVladLGBT,
  registerZahariaEmail,
  registerJesseRocks,
  registerSpunkDog,
  registerFamjamIng,
} from "./personal/index.js";
import { registerPlrsIm, registerPolarisGdn, registerZhrOne } from "./infrastructure/index.js";
import {
  registerPolarisVideo,
  registerPolarisRest,
  registerPolarisExpress,
} from "./services/index.js";
import { registerDangerDirect, registerDangerDiy } from "./local/index.js";

/**
 * Register all zones
 */
export function registerAllZones(): void {
  // Personal domains
  registerVladGG();
  registerVladLGBT();
  registerZahariaEmail();
  registerJesseRocks();
  registerSpunkDog();
  registerFamjamIng();

  // Infrastructure domains
  registerPlrsIm();
  registerPolarisGdn();
  registerZhrOne();

  // Service domains
  registerPolarisVideo();
  registerPolarisRest();
  registerPolarisExpress();

  // Local domains
  registerDangerDirect();
  registerDangerDiy();
}

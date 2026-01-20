/**
 * Service exports
 */

// Types
export * from "./types.js";

// Core utilities
export { serviceToRecords, categoryToRecords, categoriesToRecords } from "./core.js";

// Service categories
export { infrastructureServices } from "./infrastructure.js";
export { productivityServices } from "./productivity.js";
export { mediaServices } from "./media-services.js";
export { gamingServices } from "./gaming.js";
export { homelabServices } from "./homelab.js";
export { internalServices } from "./internal.js";
export { polarisVideoServices } from "./polaris-video.js";

// All services combined
import { infrastructureServices } from "./infrastructure.js";
import { productivityServices } from "./productivity.js";
import { mediaServices } from "./media-services.js";
import { gamingServices } from "./gaming.js";
import { homelabServices } from "./homelab.js";
import { internalServices } from "./internal.js";
import { polarisVideoServices } from "./polaris-video.js";
import type { ServiceCategory } from "./types.js";

export const allServices: ServiceCategory[] = [
  infrastructureServices,
  productivityServices,
  mediaServices,
  gamingServices,
  homelabServices,
  internalServices,
  polarisVideoServices,
];

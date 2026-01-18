/**
 * Tests for individual service category definitions
 */

import { describe, it, expect } from "vitest";
import { infrastructureServices } from "@services/infrastructure.js";
import { productivityServices } from "@services/productivity.js";
import { mediaServices } from "@services/media-services.js";
import { gamingServices } from "@services/gaming.js";
import { homelabServices } from "@services/homelab.js";
import { internalServices } from "@services/internal.js";
import { polarisVideoServices } from "@services/polaris-video.js";

describe("Infrastructure Services", () => {
  it("should have correct category name", () => {
    expect(infrastructureServices.name).toBe("infrastructure");
  });

  it("should have description", () => {
    expect(infrastructureServices.description).toBe("Core infrastructure services");
  });

  it("should contain router service with IP", () => {
    const router = infrastructureServices.services.find((s) => s.subdomain === "router");
    expect(router).toBeDefined();
    expect(router?.ip).toBe("10.10.0.1");
    expect(router?.proxy).toBe(false);
  });

  it("should contain truenas service with IP", () => {
    const truenas = infrastructureServices.services.find((s) => s.subdomain === "truenas");
    expect(truenas).toBeDefined();
    expect(truenas?.ip).toBe("10.10.0.10");
  });

  it("should contain auth service with direct routing", () => {
    const auth = infrastructureServices.services.find((s) => s.subdomain === "auth");
    expect(auth).toBeDefined();
    expect(auth?.server).toBe("greenwood");
    expect(auth?.routing).toBe("direct");
  });

  it("should contain docker service with tunnel routing", () => {
    const docker = infrastructureServices.services.find((s) => s.subdomain === "docker");
    expect(docker).toBeDefined();
    expect(docker?.routing).toBe("tunnel");
  });

  it("should contain up service with custom IP", () => {
    const up = infrastructureServices.services.find((s) => s.subdomain === "up");
    expect(up).toBeDefined();
    expect(up?.ip).toBe("20.64.176.83");
  });
});

describe("Productivity Services", () => {
  it("should have correct category name", () => {
    expect(productivityServices.name).toBe("productivity");
  });

  it("should contain atuin service", () => {
    const atuin = productivityServices.services.find((s) => s.subdomain === "atuin");
    expect(atuin).toBeDefined();
    expect(atuin?.server).toBe("greenwood");
  });

  it("should contain code wildcard service", () => {
    const codeWildcard = productivityServices.services.find((s) => s.subdomain === "*.code");
    expect(codeWildcard).toBeDefined();
  });

  it("should contain kiwix service with IP", () => {
    const kiwix = productivityServices.services.find((s) => s.subdomain === "kiwix");
    expect(kiwix).toBeDefined();
    expect(kiwix?.ip).toBe("10.11.2.123");
    expect(kiwix?.proxy).toBe(false);
  });
});

describe("Media Services", () => {
  it("should have correct category name", () => {
    expect(mediaServices.name).toBe("media");
  });

  it("should contain books service", () => {
    const books = mediaServices.services.find((s) => s.subdomain === "books");
    expect(books).toBeDefined();
    expect(books?.description).toBe("Calibre Web Book Library");
  });

  it("should contain manga service", () => {
    const manga = mediaServices.services.find((s) => s.subdomain === "manga");
    expect(manga).toBeDefined();
    expect(manga?.description).toBe("Komga Manga Reader");
  });

  it("should have 4 media services", () => {
    expect(mediaServices.services).toHaveLength(4);
  });
});

describe("Gaming Services", () => {
  it("should have correct category name", () => {
    expect(gamingServices.name).toBe("gaming");
  });

  it("should contain games service with tunnel routing", () => {
    const games = gamingServices.services.find((s) => s.subdomain === "games");
    expect(games).toBeDefined();
    expect(games?.routing).toBe("tunnel");
  });

  it("should contain retro service with direct routing", () => {
    const retro = gamingServices.services.find((s) => s.subdomain === "retro");
    expect(retro).toBeDefined();
    expect(retro?.routing).toBe("direct");
  });

  it("should have 2 gaming services", () => {
    expect(gamingServices.services).toHaveLength(2);
  });
});

describe("Homelab Services", () => {
  it("should have correct category name", () => {
    expect(homelabServices.name).toBe("homelab");
  });

  it("should contain zrok services on reprise4", () => {
    const zrok = homelabServices.services.find((s) => s.subdomain === "z");
    expect(zrok).toBeDefined();
    expect(zrok?.server).toBe("reprise4");
  });

  it("should contain ai service with tunnel routing", () => {
    const ai = homelabServices.services.find((s) => s.subdomain === "ai");
    expect(ai).toBeDefined();
    expect(ai?.routing).toBe("tunnel");
  });

  it("should contain registry service", () => {
    const registry = homelabServices.services.find((s) => s.subdomain === "registry");
    expect(registry).toBeDefined();
    expect(registry?.description).toBe("Docker Registry");
  });
});

describe("Internal Services", () => {
  it("should have correct category name", () => {
    expect(internalServices.name).toBe("internal");
  });

  it("should have all services with internal routing", () => {
    for (const service of internalServices.services) {
      expect(service.routing).toBe("internal");
      expect(service.proxy).toBe(false);
    }
  });

  it("should have all services on local-traefik", () => {
    for (const service of internalServices.services) {
      expect(service.server).toBe("local-traefik");
    }
  });

  it("should have 4 internal services", () => {
    expect(internalServices.services).toHaveLength(4);
  });
});

describe("Polaris Video Services", () => {
  it("should have correct category name", () => {
    expect(polarisVideoServices.name).toBe("polaris-video");
  });

  it("should have description", () => {
    expect(polarisVideoServices.description).toBe("Media streaming and management services");
  });

  it("should contain media service (Plex)", () => {
    const media = polarisVideoServices.services.find((s) => s.subdomain === "media");
    expect(media).toBeDefined();
    expect(media?.description).toBe("Plex Media Server");
    expect(media?.routing).toBe("direct");
  });

  it("should contain request service (Overseerr)", () => {
    const request = polarisVideoServices.services.find((s) => s.subdomain === "request");
    expect(request).toBeDefined();
    expect(request?.routing).toBe("tunnel");
  });

  it("should contain arr services", () => {
    const arrServices = ["sonarr", "radarr", "lidarr", "readarr", "prowlarr"];
    for (const name of arrServices) {
      const service = polarisVideoServices.services.find((s) => s.subdomain === name);
      expect(service).toBeDefined();
      expect(service?.routing).toBe("tunnel");
    }
  });

  it("should have 21 polaris video services", () => {
    expect(polarisVideoServices.services).toHaveLength(21);
  });
});

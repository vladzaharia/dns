import { Record } from "../utils/record";
import { GetHost } from "./core";

/**
 * Infrastructure
 */
export const InfrastructureRecords: Record[] = [
  /* Infrastructure */
  { name: "router", description: "Router", target: "10.10.0.1", type: "A" },
  { name: "truenas", description: "TrueNAS", target: "10.10.0.10", type: "A" },
  {
    name: "auth",
    description: "Authentik/Zitadel",
    target: GetHost("Greenwood"),
  },
  {
    name: "vault",
    description: "Hashicorp Vault",
    target: GetHost("Greenwood"),
  },
  { name: "docker", description: "Arcane Docker Management", azgw: true },
  { name: "up", description: "Uptime Kuma", target: "20.64.176.83", type: "A" },
  {
    name: "net",
    description: "Polaris Tunnels",
    target: GetHost("AzureGateway"),
  },
];

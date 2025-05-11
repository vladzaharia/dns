import { Record } from "../utils/record";

/**
 * Productivity services
 */
export const ProductivityServiceRecords: Record[] = [
  { name: "atuin", description: "Atuin Shell History" },
  { name: "cloud", description: "Owncloud" },
  { name: "docs", description: "OnlyOffice" },
  { name: "code", description: "Coder" },
  { name: "*.code", description: "Coder Wildcard" },
  { name: "mqtt", description: "Mosquitto mqtt" },
  { name: "chat", description: "OpenWebUI" },
  { name: "kiwix", description: "Kiwix", target: "10.11.2.123", type: "A" },
];

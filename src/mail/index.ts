/**
 * Mail provider exports
 */

export { createFastmailRecords, createFastmailSubdomainRecords } from "./fastmail.js";
export type { FastmailOptions } from "./fastmail.js";

export { createPostalRecords, createPostalServiceRecords } from "./postal.js";
export type { PostalDomainOptions } from "./postal.js";

export { createCloudflareEmailRecords } from "./cloudflare.js";
export type { CloudflareEmailOptions } from "./cloudflare.js";

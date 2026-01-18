/**
 * DNS Provider - Cloudflare
 */
export const CloudflareDns = NewDnsProvider("cloudflare");
export const CloudflareDnsWithRedirect = NewDnsProvider(
  "cloudflare",
  undefined,
  { manage_redirects: true }
);

/**
 * Turn on Cloudflare proxy.
 */
export const CfProxyOn = { cloudflare_proxy: "on" };

/**
 * Turn off the Cloudflare proxy.
 * This is the default value
 */
export const CfProxyOff = { cloudflare_proxy: "off" };

/**
 * Turn on Cloudflare Universal SSL, if proxy is enabled.
 * This is the default value.
 */
export const CfSSLOn = { cloudflare_universalssl: "on" };

/**
 * Turn off the Cloudflare Universal SSL, if proxy is disabled.
 */
export const CfSSLOff = { cloudflare_universalssl: "off" };

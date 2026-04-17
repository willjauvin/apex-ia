export function detectPlatform(html: string): "shopify" | "woocommerce" | "etsy" | "unknown" {
  if (html.includes("cdn.shopify.com") || html.includes("Shopify.theme")) {
    return "shopify"
  }

  if (html.includes("woocommerce") || html.includes("wp-content/plugins/woocommerce")) {
    return "woocommerce"
  }

  if (html.includes("etsy.com") || html.includes("Etsy marketplace")) {
    return "etsy"
  }

  return "unknown"
}


export function detectPlatform(html: string): "shopify" | "woocommerce" | "etsy" | "unknown" {
  // Shopify
  if (html.includes("cdn.shopify.com") || html.includes("Shopify.theme")) {
    return "shopify"
  }

  // WooCommerce
  if (html.includes("woocommerce") || html.includes("wp-content/plugins/woocommerce")) {
    return "woocommerce"
  }

  // Etsy
  if (html.includes("etsy.com") || html.includes("Etsy marketplace")) {
    return "etsy"
  }

  return "unknown"
}


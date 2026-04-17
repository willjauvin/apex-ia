export async function scrapeShopify(url: string) {
  const cleanUrl = url.endsWith("/") ? url.slice(0, -1) : url
  const apiUrl = `${cleanUrl}/products.json`

  const res = await fetch(apiUrl)
  if (!res.ok) throw new Error("Shopify API inaccessible")

  const data = await res.json()

  const products = data.products.map((p: any) => ({
    name: p.title,
    description: p.body_html,
    shortDescription: p.body_html?.slice(0, 200) || "",
    price: p.variants?.[0]?.price || 0,
    currency: "CAD",
    sku: p.variants?.[0]?.sku || null,
    images: p.images?.map((img: any) => img.src) || [],
    category: p.product_type || "Autre",
    tags: p.tags?.split(",") || [],
    variants: p.variants?.map((v: any) => ({
      name: v.title,
      price: v.price,
      sku: v.sku
    })) || [],
    url: `${cleanUrl}/products/${p.handle}`
  }))

  return { products }
}


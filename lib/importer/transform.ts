type BuildShopJsonArgs = {
  url: string
  scraped: { title: string; text: string }
  extraction: any
  classification: any
  summary: string
}

export function buildShopJson(args: BuildShopJsonArgs) {
  const { url, scraped, extraction, classification, summary } = args

  const products = (extraction.products || []).map((p: any) => ({
    title: p.name || "Produit sans nom",
    slug: slugify(p.name || "produit"),
    description: p.description || "",
    shortDescription: p.shortDescription || "",
    price: p.price || 0,
    currency: p.currency || "CAD",
    sku: p.sku || null,
    images: p.images || [],
    category: p.category || classification.mainCategory || "Autre",
    tags: p.tags || [],
    variants: p.variants || [],
    metadata: {
      sourceUrl: p.url || url
    }
  }))

  return {
    shop: {
      name: scraped.title || "Boutique importée",
      url,
      currency: "CAD",
      platform: classification.platform || "unknown",
      summary
    },
    products
  }
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}


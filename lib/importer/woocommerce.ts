import * as cheerio from "cheerio"

export async function scrapeWooCommerce(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Impossible de charger la page WooCommerce")

  const html = await res.text()
  const $ = cheerio.load(html)

  const products: any[] = []

  $(".product").each((_, el) => {
    const name = $(el).find(".woocommerce-loop-product__title").text().trim()
    const price = $(el).find(".price").text().trim()
    const img = $(el).find("img").attr("src")
    const link = $(el).find("a").attr("href")

    if (name) {
      products.push({
        name,
        description: "",
        shortDescription: "",
        price,
        currency: "CAD",
        sku: null,
        images: img ? [img] : [],
        category: "WooCommerce",
        tags: [],
        variants: [],
        url: link
      })
    }
  })

  return { products }
}


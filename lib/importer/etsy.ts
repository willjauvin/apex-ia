import * as cheerio from "cheerio"

export async function scrapeEtsy(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Impossible de charger Etsy")

  const html = await res.text()
  const $ = cheerio.load(html)

  const products: any[] = []

  $("[data-listing-id]").each((_, el) => {
    const name = $(el).find("h3").text().trim()
    const price = $(el).find(".currency-value").first().text().trim()
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
        category: "Etsy",
        tags: [],
        variants: [],
        url: link
      })
    }
  })

  return { products }
}


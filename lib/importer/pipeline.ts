import { scrapePage } from "./scraper"
import { hfExtract, hfClassify, hfSummarize } from "@/lib/ai/huggingface"
import { buildShopJson } from "./transform"

type ImportContext = {
  url: string
  userId?: string
  shopId?: string
}

export async function runImportPipeline(ctx: ImportContext) {
  const { url } = ctx

  // 1. Scraper
  const scraped = await scrapePage(url)

  // 2. Extraction NER (produits, prix, images, etc.)
  const extraction = await hfExtract({
    text: scraped.text,
    task: "product_extraction"
  })

  // 3. Classification (catégorie de boutique, plateforme)
  const classification = await hfClassify({
    text: scraped.text,
    task: "shop_category"
  })

  // 4. Résumé global
  const summary = await hfSummarize({
    text: scraped.text,
    maxLength: 300
  })

  // 5. Transformation → JSON final
  const json = buildShopJson({
    url,
    scraped,
    extraction,
    classification,
    summary
  })

  return json
}


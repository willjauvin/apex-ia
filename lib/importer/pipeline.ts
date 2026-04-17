import { scrapePage } from "./scraper"
import { detectPlatform } from "./detect"
import { scrapeShopify } from "./shopify"
import { scrapeWooCommerce } from "./woocommerce"
import { scrapeEtsy } from "./etsy"
import { hfExtract, hfClassify, hfSummarize } from "@/lib/ai/huggingface"
import { buildShopJson } from "./transform"

export async function runImportPipeline({ url }: { url: string }) {
  const scraped = await scrapePage(url)

  const platform = detectPlatform(scraped.html)

  let extraction

  if (platform === "shopify") {
    extraction = await scrapeShopify(url)
  } else if (platform === "woocommerce") {
    extraction = await scrapeWooCommerce(url)
  } else if (platform === "etsy") {
    extraction = await scrapeEtsy(url)
  } else {
    extraction = await hfExtract({
      text: scraped.text,
      task: "product_extraction"
    })
  }

  const classification = await hfClassify({
    text: scraped.text,
    task: "shop_category"
  })

  const summary = await hfSummarize({
    text: scraped.text,
    task: "summary"
  })

  return buildShopJson({
    url,
    scraped,
    extraction,
    classification,
    summary
  })
}


import * as cheerio from "cheerio"

export async function scrapePage(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "SimpliGenIaBot/1.0 (+https://simpligenia.com)"
    }
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url} (${res.status})`)
  }

  const html = await res.text()
  const $ = cheerio.load(html)

  const title = $("title").first().text().trim()
  const text = $("body").text().replace(/\s+/g, " ").trim()

  return {
    html,
    text,
    title
  }
}


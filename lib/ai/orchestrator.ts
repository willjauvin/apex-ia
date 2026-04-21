import { deepseekChat } from "./deepseek"
import { geminiChat } from "./gemini"
import { hfChat, hfExtract, hfEmbed, hfClassify, hfSummarize } from "./huggingface"
import { openaiImage, openaiChat } from "./openai"

type PlanIA = "free" | "plus" | "pro" | "ultra"
type PlanShops =
  | "none"
  | "gratuit"
  | "starter"
  | "pro"
  | "entreprise"
  | "depart"
  | "vitrine-pro"
  | "expert"
  | "boutique-express"
  | "boutique-pro"
  | "vitrine-pack"
  | "ia-premium"

export async function runAI({
  type,
  prompt,
  planIA = "free",
  planShops = "none"
}: {
  type: string
  prompt: any
  planIA?: PlanIA
  planShops?: PlanShops
}) {
  // Types texte → IA (SimpliGenIa)
  if (
    type === "chat" ||
    type === "store" ||
    type === "product" ||
    type === "collection" ||
    type === "branding" ||
    type === "website" ||
    type === "content"
  ) {
    return await smartChat(prompt, planIA)
  }

  // Images → plans SimpliShops
  if (type === "images") {
    return await smartImage(prompt, planShops)
  }

  if (type === "extract") return await hfExtract(prompt)
  if (type === "embed") return await hfEmbed(prompt)
  if (type === "classify") return await hfClassify(prompt)
  if (type === "summarize") return await hfSummarize(prompt)
  if (type === "hf-chat") return await hfChat(prompt)

  return await smartChat(prompt, planIA)
}

/* --------- CHAT : piloté par planIA (Free / Plus / Pro / Ultra) --------- */
async function smartChat(prompt: string, planIA: PlanIA) {
  // Ultra / Pro → priorité OpenAI GPT‑4o
  if (planIA === "pro" || planIA === "ultra") {
    try {
      const o = await openaiChat(prompt)
      if (o) return o
    } catch (err) {
      console.warn("OpenAI GPT-4o failed:", err)
    }
  }

  // Tous les plans → DeepSeek en priorité
  try {
    const d = await deepseekChat(prompt)
    if (d) return d
  } catch (err) {
    console.warn("DeepSeek failed:", err)
  }

  // Plus / Pro / Ultra → Gemini si dispo
  if (planIA === "plus" || planIA === "pro" || planIA === "ultra") {
    try {
      const g = await geminiChat(prompt)
      if (g && !g.includes("réponse vide")) return g
    } catch (err) {
      console.warn("Gemini failed:", err)
    }
  }

  // Tous les plans → HuggingFace en dernier recours
  try {
    const h = await hfChat(prompt)
    if (h) return h
  } catch (err) {
    console.warn("HF failed:", err)
  }

  return "⚠️ Aucun modèle n'a pu répondre pour le moment."
}

/* --------- IMAGES : piloté par planShops (SimpliShops) --------- */
async function smartImage(prompt: string, planShops: PlanShops) {
  const hasPremiumImage =
    planShops === "pro" ||
    planShops === "entreprise" ||
    planShops === "expert" ||
    planShops === "boutique-pro" ||
    planShops === "ia-premium" ||
    planShops === "vitrine-pro"

  // Plans vitrine/boutique avancés → OpenAI images
  if (hasPremiumImage) {
    try {
      const img = await openaiImage(prompt)
      if (img) return img
    } catch (err) {
      console.warn("OpenAI image failed:", err)
    }
  }

  // Fallback → HF (ou ton moteur image HF plus tard)
  try {
    const img = await hfChat(`Génère une image: ${prompt}`)
    return img
  } catch (err) {
    console.warn("HF image failed:", err)
  }

  return null
}


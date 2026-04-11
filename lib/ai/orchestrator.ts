import { deepseekChat } from "./deepseek"
import { geminiChat } from "./gemini"
import { hfChat, hfExtract, hfEmbed, hfClassify, hfSummarize } from "./huggingface"

export async function runAI({
  type,
  prompt
}: {
  type: string
  prompt: any
}) {
  // Types “classiques” → on passe par la stratégie intelligente
  if (
    type === "chat" ||
    type === "store" ||
    type === "product" ||
    type === "collection" ||
    type === "branding" ||
    type === "website" ||
    type === "content" ||
    type === "images"
  ) {
    return await smartChat(prompt, type)
  }

  // --- HuggingFace : extraction de données ---
  if (type === "extract") return await hfExtract(prompt)

  // --- HuggingFace : embeddings ---
  if (type === "embed") return await hfEmbed(prompt)

  // --- HuggingFace : classification ---
  if (type === "classify") return await hfClassify(prompt)

  // --- HuggingFace : résumé ---
  if (type === "summarize") return await hfSummarize(prompt)

  // --- HuggingFace : chat open-source ---
  if (type === "hf-chat") return await hfChat(prompt)

  // Fallback global
  return await smartChat(prompt, type)
}

async function smartChat(prompt: string, type: string) {
  // 1) DeepSeek en priorité
  try {
    return await deepseekChat(prompt)
  } catch (err: any) {
    console.warn("DeepSeek failed:", err?.message || err)

    // Si c’est un problème de balance, on log clairement
    if (err?.message?.includes("Insufficient Balance")) {
      console.warn("DeepSeek: solde insuffisant, bascule vers Gemini.")
    }
  }

  // 2) Gemini en fallback
  try {
    return await geminiChat(prompt)
  } catch (err: any) {
    console.warn("Gemini failed:", err?.message || err)
  }

  // 3) HuggingFace en dernier recours
  try {
    return await hfChat(prompt)
  } catch (err: any) {
    console.warn("HuggingFace failed:", err?.message || err)
  }

  // Si tout échoue
  return "Tous les modèles ont échoué (DeepSeek, Gemini, HuggingFace)."
}

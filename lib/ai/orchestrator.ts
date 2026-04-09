import { groqChat } from "./groq"
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
  switch (type) {
    // --- Génération de boutique / produits / collections ---
    case "store":
    case "product":
    case "collection":
      return await groqChat(prompt)

    // --- Branding / Website ---
    case "branding":
    case "website":
      return await geminiChat(prompt)

    // --- Contenu long / SEO ---
    case "content":
      return await deepseekChat(prompt)

    // --- Images (open-source possible plus tard) ---
    case "images":
      return await groqChat(prompt)

    // --- HuggingFace : extraction de données ---
    case "extract":
      return await hfExtract(prompt)

    // --- HuggingFace : embeddings ---
    case "embed":
      return await hfEmbed(prompt)

    // --- HuggingFace : classification ---
    case "classify":
      return await hfClassify(prompt)

    // --- HuggingFace : résumé ---
    case "summarize":
      return await hfSummarize(prompt)

    // --- HuggingFace : chat open-source ---
    case "hf-chat":
      return await hfChat(prompt)

    // --- Fallback ---
    default:
      return await groqChat(prompt)
  }
}


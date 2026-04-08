import { groqChat } from "./groq"
import { deepseekChat } from "./deepseek"
import { geminiChat } from "./gemini"

export async function ai(prompt: string, mode: string) {
  switch (mode) {
    case "store":
    case "product":
    case "collection":
      return await groqChat(prompt)

    case "website":
    case "branding":
      return await geminiChat(prompt)

    case "content":
      return await deepseekChat(prompt)

    default:
      return await groqChat(prompt)
  }
}

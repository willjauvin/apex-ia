import { runAI } from "@/lib/ai/orchestrator"
import { createConversation, addMessage, getMessages } from "@/lib/supabaseMemory"

export async function POST(req: Request) {
  const { message, conversationId } = await req.json()

  let convId = conversationId

  // Si pas de conversation → on en crée une
  if (!convId) {
    const conv = await createConversation("anonymous")
    convId = conv.id
  }

  // On sauvegarde le message utilisateur
  await addMessage(convId, "user", message)

  // On récupère l’historique
  const history = await getMessages(convId)

  // Limite automatique : garder seulement les 20 derniers messages
  const limitedHistory = history.slice(-20)

  // On construit un prompt contextuel
  const prompt = history.map(m => `${m.role}: ${m.content}`).join("\n")

  // On envoie à l’IA
  const reply = await runAI({ type: "chat", prompt })

  // On sauvegarde la réponse
  await addMessage(convId, "assistant", reply)

  return Response.json({ reply, conversationId: convId })
}

import { runAI } from "@/lib/ai/orchestrator"
import {
  createConversation,
  addMessage,
  getMessages,
  saveLongMemory,
  getLongMemory
} from "@/lib/supabaseMemory"

export async function POST(req: Request) {
  try {
    const { message, conversationId, userId = "anonymous" } = await req.json()

    if (!message || message.trim() === "") {
      return Response.json({ error: "Message vide" }, { status: 400 })
    }

    let convId = conversationId

    // 1. Si aucune conversation → on en crée une
    if (!convId) {
      const conv = await createConversation(userId)
      convId = conv.id
    }

    // 2. On sauvegarde le message utilisateur
    await addMessage(convId, "user", message)

    // 3. On récupère l’historique complet
    const history = await getMessages(convId)

    // 4. On limite la mémoire courte (20 derniers messages)
    const limitedHistory = history.slice(-20)

    // 5. On récupère la mémoire longue durée
    const longMemory = await getLongMemory(userId)

    // 6. On construit le prompt complet
    const prompt =
      (longMemory.length > 0
        ? "Mémoire longue durée de l'utilisateur :\n" +
          longMemory.map(m => `- ${m.key}: ${m.value}`).join("\n") +
          "\n\n"
        : "") +
      "Conversation récente :\n" +
      limitedHistory.map(m => `${m.role}: ${m.content}`).join("\n") +
      `\nassistant:`

    // 7. On envoie à l’IA
    const reply = await runAI({ type: "chat", prompt })

    // 8. On sauvegarde la réponse
    await addMessage(convId, "assistant", reply)

    // 9. Détection automatique d’informations importantes
    if (
      reply.toLowerCase().includes("je retiens") ||
      reply.toLowerCase().includes("je me souviendrai") ||
      reply.toLowerCase().includes("information importante")
    ) {
      await saveLongMemory(userId, "info", reply)
    }

    return Response.json({
      reply,
      conversationId: convId
    })
  } catch (err) {
    console.error("Erreur API /ai :", err)
    return Response.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

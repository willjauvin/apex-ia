import { deepseekChatStream } from "@/lib/ai/deepseek"
import {
  createConversation,
  addMessage,
  getMessages,
  saveLongMemory,
  getLongMemory
} from "@/lib/supabaseMemory"

export async function POST(req: Request) {
  try {
    const { message, conversationId, userId = "anonymous", mode = "chat" } =
      await req.json()

    if (!message || message.trim() === "") {
      return new Response("Message vide", { status: 400 })
    }

    let convId = conversationId

    // 1. Création conversation si nécessaire
    if (!convId) {
      const conv = await createConversation(userId)
      convId = conv.id
    }

    // 2. Sauvegarde du message utilisateur
    await addMessage(convId, "user", message)

    // 3. Récupération historique
    const history = await getMessages(convId)
    const limitedHistory = history.slice(-20)

    // 4. Mémoire longue durée
    const longMemory = await getLongMemory(userId)

    // 5. Construction du prompt
    const prompt =
      (longMemory.length > 0
        ? "Mémoire longue durée de l'utilisateur :\n" +
          longMemory.map(m => `- ${m.key}: ${String(m.value)}`).join("\n") +
          "\n\n"
        : "") +
      "Conversation récente :\n" +
      limitedHistory.map(m => `${m.role}: ${m.content}`).join("\n") +
      `\nassistant:`

    // 6. Appel DeepSeek en streaming
    const stream = await deepseekChatStream(prompt)

    // 7. Reconstruction progressive de la réponse
    let fullReply = ""

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const readable = new ReadableStream({
      async start(controller) {
        const reader = stream.getReader()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)

          // DeepSeek envoie des lignes "data: {...}"
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (!line.startsWith("data:")) continue
            if (line === "data: [DONE]") continue

            try {
              const json = JSON.parse(line.replace("data: ", ""))
              const token = json.choices?.[0]?.delta?.content

              if (token) {
                fullReply += token
                controller.enqueue(encoder.encode(token))
              }
            } catch (err) {
              console.error("Erreur parsing chunk:", err)
            }
          }
        }

        controller.close()

        // 8. Sauvegarde finale de la réponse complète
        await addMessage(convId!, "assistant", fullReply)

        // 9. Détection mémoire longue durée
        if (
          fullReply.toLowerCase().includes("je retiens") ||
          fullReply.toLowerCase().includes("je me souviendrai") ||
          fullReply.toLowerCase().includes("information importante")
        ) {
          await saveLongMemory(userId, "info", fullReply)
        }
      }
    })

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Conversation-Id": convId!
      }
    })
  } catch (err) {
    console.error("Erreur API /ai :", err)
    return new Response("Erreur interne du serveur", { status: 500 })
  }
}


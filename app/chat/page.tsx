"use client"

import { useState } from "react"
import ChatBubble from "./components/ChatBubble"
import ChatInput from "./components/ChatInput"
import ModeSelector from "./components/ModeSelector"
import TypingIndicator from "./components/TypingIndicator"

export const dynamic = "force-dynamic"

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [mode, setMode] = useState("chat")
  const [isStreaming, setIsStreaming] = useState(false)
  const [partialMessage, setPartialMessage] = useState("")

  async function sendMessage(input: string) {
    if (!input.trim()) return

    // Ajout du message utilisateur
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])

    // Reset du message partiel
    setPartialMessage("")
    setIsStreaming(true)

    // Envoi au backend (streaming)
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        conversationId,
        userId: "anonymous",
        mode
      })
    })

    // Récupération du conversationId depuis les headers
    const newConvId = response.headers.get("X-Conversation-Id")
    if (newConvId && !conversationId) {
      setConversationId(newConvId)
    }

    // Lecture du flux
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    if (!reader) {
      setIsStreaming(false)
      return
    }

    let fullMessage = ""

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      fullMessage += chunk
      setPartialMessage(fullMessage)
    }

    // Fin du streaming
    setIsStreaming(false)

    // Ajout du message final dans l’historique
    const aiMessage = { role: "assistant", content: fullMessage }
    setMessages((prev) => [...prev, aiMessage])

    // Reset du message partiel
    setPartialMessage("")
  }

  return (
    <main className="min-h-screen flex flex-col p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Chat IA</h1>

      {/* Sélecteur de mode */}
      <ModeSelector mode={mode} setMode={setMode} />

      {/* Zone de messages */}
      <div className="flex-1 border rounded-lg p-4 bg-white shadow overflow-y-auto mb-4">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">Commencez la conversation…</p>
        )}

        {messages.map((msg, i) => (
          <ChatBubble key={i} role={msg.role} content={msg.content} />
        ))}

        {/* Message en cours de streaming */}
        {isStreaming && partialMessage && (
          <ChatBubble role="assistant" content={partialMessage} />
        )}

        {/* Typing indicator */}
        {isStreaming && !partialMessage && <TypingIndicator />}
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} />
    </main>
  )
}


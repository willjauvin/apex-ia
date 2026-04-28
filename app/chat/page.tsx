"use client"

import { useState } from "react"
import ChatBubble from "./components/ChatBubble"
import ChatInput from "./components/ChatInput"
import ModeSelector from "./components/ModeSelector"

export const dynamic = "force-dynamic"

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [mode, setMode] = useState("chat") // ← NOUVEAU

  async function sendMessage(input: string) {
    if (!input.trim()) return

    // Ajout du message utilisateur
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])

    // Envoi au backend
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        conversationId,
        userId: "anonymous",
        mode // ← ENVOI DU MODE AU BACKEND
      })
    })

    const data = await response.json()

    // Mise à jour conversationId si nouveau
    if (!conversationId && data.conversationId) {
      setConversationId(data.conversationId)
    }

    // Ajout du message IA
    const aiMessage = { role: "assistant", content: data.reply }
    setMessages((prev) => [...prev, aiMessage])
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
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} />
    </main>
  )
}


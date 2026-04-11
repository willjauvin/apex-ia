"use client"

import { useState } from "react"

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState("")
  const [conversationId, setConversationId] = useState<string | null>(null)

  async function sendMessage() {
    if (!input.trim()) return

    // Ajout du message utilisateur dans l’UI
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])

    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        conversationId: conversationId
      })
    })

    const data = await response.json()

    // Si c’est la première réponse → on sauvegarde la conversation
    if (!conversationId) {
      setConversationId(data.conversationId)
    }

    // Ajout du message IA dans l’UI
    const aiMessage = { role: "assistant", content: data.reply }
    setMessages((prev) => [...prev, aiMessage])

    setInput("")
  }

  return (
    <main className="min-h-screen flex flex-col p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Chat IA</h1>

      <div className="flex-1 border rounded-lg p-4 bg-white shadow overflow-y-auto mb-4">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">Commencez la conversation…</p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 p-3 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-100 text-blue-900 self-end"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-lg p-3"
          placeholder="Écrire un message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Envoyer
        </button>
      </div>
    </main>
  )
}

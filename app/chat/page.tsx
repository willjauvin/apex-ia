"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

import ChatBubble from "./components/ChatBubble"
import ChatInput from "./components/ChatInput"
import ModeSelector from "./components/ModeSelector"
import TypingIndicator from "./components/TypingIndicator"

export const dynamic = "force-dynamic"

export default function ChatPage() {
  const router = useRouter()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [mode, setMode] = useState("chat")
  const [isStreaming, setIsStreaming] = useState(false)
  const [partialMessage, setPartialMessage] = useState("")

  async function sendMessage(input: string) {
    if (!input.trim()) return

    // 1. Vérifier si l'utilisateur est connecté
    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) {
      router.push("/login")
      return
    }

    const userId = auth.user.id

    // 2. Si aucune conversation → en créer une
    let convId = conversationId

    if (!convId) {
      const uuid = crypto.randomUUID()

      const { error } = await supabase.from("conversations").insert({
        uuid,
        user_id: userId,
        created_at: new Date()
      })

      if (error) {
        console.error("Erreur création conversation :", error)
        return
      }

      convId = uuid
      setConversationId(uuid)
    }

    // 3. Ajouter le message utilisateur dans l’UI
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])

    // 4. Préparer le streaming
    setPartialMessage("")
    setIsStreaming(true)

    // 5. Envoi au backend AVEC userId réel
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        conversationId: convId,
        userId: userId,
        mode
      })
    })

    // 6. Récupérer conversationId depuis les headers (fallback)
    const newConvId = response.headers.get("X-Conversation-Id")
    if (newConvId && !conversationId) {
      setConversationId(newConvId)
    }

    // 7. Streaming
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

    // 8. Fin du streaming
    setIsStreaming(false)

    // 9. Ajouter le message final
    const aiMessage = { role: "assistant", content: fullMessage }
    setMessages((prev) => [...prev, aiMessage])

    setPartialMessage("")
  }

  return (
    <main
      className="min-h-screen flex flex-col p-6 max-w-2xl mx-auto
      bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100
      transition-colors duration-300"
    >

      {/* Header premium */}
      <div className="flex flex-col items-center mb-6 animate-[fadeInUp_0.35s_ease-out]">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 shadow-lg mb-3"></div>

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
          SimpliGenIa
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Votre assistant IA intelligent
        </p>

        <div className="w-full border-b border-gray-200 dark:border-gray-700 mt-4"></div>
      </div>

      {/* Sélecteur de mode */}
      <ModeSelector mode={mode} setMode={setMode} />

      {/* Zone de messages */}
      <div
        className="flex-1 border rounded-xl p-6 
        bg-white dark:bg-gray-800 
        border-gray-200 dark:border-gray-700 
        shadow-inner overflow-y-auto mb-4 space-y-2 transition-colors"
      >
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">Commencez la conversation…</p>
        )}

        {messages.map((msg, i) => (
          <ChatBubble key={i} role={msg.role} content={msg.content} />
        ))}

        {isStreaming && partialMessage && (
          <ChatBubble role="assistant" content={partialMessage} />
        )}

        {isStreaming && !partialMessage && <TypingIndicator />}
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} />
    </main>
  )
}


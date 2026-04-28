"use client"

import { useState } from "react"

export default function ChatInput({ onSend }: { onSend: (msg: string) => void }) {
  const [input, setInput] = useState("")

  function handleSend() {
    if (!input.trim()) return
    onSend(input)
    setInput("")
  }

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 border rounded-lg p-3"
        placeholder="Écrire un message…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleSend}
        className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Envoyer
      </button>
    </div>
  )
}


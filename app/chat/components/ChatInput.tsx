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
        className="flex-1 px-4 py-3 rounded-lg border 
                   border-gray-300 dark:border-gray-700
                   bg-white dark:bg-gray-800
                   text-gray-900 dark:text-gray-100
                   placeholder-gray-500 dark:placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   transition"
        placeholder="Écrire un message…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleSend}
        className="px-5 py-3 rounded-lg font-semibold
                   bg-gradient-to-r from-blue-600 to-orange-500
                   text-white shadow hover:opacity-90 transition"
      >
        Envoyer
      </button>
    </div>
  )
}


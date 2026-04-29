"use client"

import { useRouter } from "next/navigation"

export default function NewChatButton() {
  const router = useRouter()

  async function createNewChat() {
    router.push("/chat")
    router.refresh()
  }

  return (
    <button
      onClick={createNewChat}
      className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-orange-500 
      text-white font-semibold shadow hover:opacity-90 transition"
    >
      + Nouvelle conversation
    </button>
  )
}


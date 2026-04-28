"use client"

import { useRouter } from "next/navigation"

export default function NewChatButton() {
  const router = useRouter()

  async function createNewChat() {
    router.push("/chat") // reset conversation
    router.refresh()
  }

  return (
    <button
      onClick={createNewChat}
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Nouvelle conversation
    </button>
  )
}


"use client"

import { useEffect, useState } from "react"
import SidebarItem from "./SidebarItem"
import NewChatButton from "./NewChatButton"

export default function Sidebar() {
  const [conversations, setConversations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function loadConversations() {
    setLoading(true)
    const res = await fetch("/api/conversations/list")
    const data = await res.json()
    setConversations(data.conversations || [])
    setLoading(false)
  }

  useEffect(() => {
    loadConversations()
  }, [])

  return (
    <div className="w-64 bg-white border-r p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Conversations</h2>

      <NewChatButton />

      <div className="flex-1 overflow-y-auto mt-4 space-y-2">
        {loading && <p className="text-gray-500">Chargement…</p>}

        {!loading && conversations.length === 0 && (
          <p className="text-gray-500">Aucune conversation</p>
        )}

        {conversations.map((conv) => (
          <SidebarItem
            key={conv.id}
            id={conv.id}
            title={conv.title || "Conversation"}
            onDelete={loadConversations}
          />
        ))}
      </div>
    </div>
  )
}


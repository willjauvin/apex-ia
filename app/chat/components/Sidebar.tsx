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
    <div className="w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col transition-colors">
      
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 shadow"></div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
          SimpliGenIa
        </h2>
      </div>

      {/* New chat */}
      <NewChatButton />

      {/* Separator */}
      <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto space-y-2">
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


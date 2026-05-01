"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Sidebar() {
  const [user, setUser] = useState<any>(null)
  const [conversations, setConversations] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    loadUser()
  }, [])

  useEffect(() => {
    if (!user) return

    async function loadConversations() {
      const { data } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })

      setConversations(data || [])
    }

    loadConversations()
  }, [user])

  async function newConversation() {
    const { data, error } = await supabase
      .from("conversations")
      .insert([{ user_id: user.id, title: "Nouvelle conversation" }])
      .select()
      .single()

    if (!error && data) {
      router.push(`/chat/${data.id}`)
    }
  }

  return (
    <aside className="w-72 h-screen bg-[#0a0f1f]/80 backdrop-blur-xl border-r border-white/5 text-white p-4 flex flex-col">
      
      {/* Bouton nouvelle conversation */}
      <button
        onClick={newConversation}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-orange-500 hover:opacity-90 transition font-semibold"
      >
        + Nouvelle conversation
      </button>

      <div className="mt-6 text-sm text-gray-300">Conversations</div>

      {/* Liste des conversations */}
      <div className="mt-2 flex-1 overflow-y-auto space-y-2">
        {conversations.length === 0 && (
          <div className="text-gray-500 text-sm mt-4">Aucune conversation</div>
        )}

        {conversations.map((conv) => (
          <Link
            key={conv.id}
            href={`/chat/${conv.id}`}
            className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            <div className="font-medium text-white">
              {conv.title || "Sans titre"}
            </div>
            <div className="text-xs text-gray-400 truncate">
              {conv.last_message || "Aucun message"}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}


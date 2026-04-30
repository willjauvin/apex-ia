"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function HistoryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [conversations, setConversations] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push("/login")
        return
      }

      setUser(data.user)

      const { data: conv } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", data.user.id)
        .order("created_at", { ascending: false })

      setConversations(conv || [])
      setLoading(false)
    }

    load()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-black flex items-center justify-center text-white">
        Chargement...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
          Historique des conversations
        </h1>

        {conversations.length === 0 && (
          <p className="text-gray-300">Aucune conversation pour le moment.</p>
        )}

        <div className="space-y-4">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className="bg-white rounded-2xl p-5 text-black shadow-xl flex items-center justify-between hover:scale-[1.01] transition cursor-pointer"
              onClick={() => router.push(`/chat/${conv.uuid}`)}
            >
              <div>
                <p className="font-semibold">Conversation</p>
                <p className="text-gray-600 text-sm">
                  {new Date(conv.created_at).toLocaleString()}
                </p>
              </div>

              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold hover:opacity-90 transition">
                Ouvrir
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}


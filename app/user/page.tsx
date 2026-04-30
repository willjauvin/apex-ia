"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function UserDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push("/login")
        return
      }
      setUser(data.user)
      setLoading(false)
    }
    loadUser()
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-black flex items-center justify-center text-white">
        Chargement...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              Espace utilisateur
            </h1>
            <p className="text-gray-300 mt-1">
              Bienvenue, {user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl border border-white/20 text-sm hover:bg-white/10 transition"
          >
            Se déconnecter
          </button>
        </header>

        {/* CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 text-black shadow-xl">
            <p className="text-sm text-gray-500">Plan actuel</p>
            <p className="mt-2 text-xl font-semibold">Free</p>
            <p className="text-xs text-gray-500 mt-1">
              Mise à niveau bientôt disponible
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 text-black shadow-xl">
            <p className="text-sm text-gray-500">Conversations</p>
            <p className="mt-2 text-xl font-semibold">Bientôt</p>
            <p className="text-xs text-gray-500 mt-1">
              Historique lié à votre compte
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 text-black shadow-xl">
            <p className="text-sm text-gray-500">Statut</p>
            <p className="mt-2 text-xl font-semibold text-green-600">Actif</p>
            <p className="text-xs text-gray-500 mt-1">
              Votre accès SimpliGenIa est opérationnel
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold">Accéder à l’assistant</h2>
          <p className="text-gray-300 mt-1">
            Lancez une nouvelle session avec SimpliGenIa.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold hover:opacity-90 transition"
          >
            Ouvrir l’assistant
          </button>
        </section>

        {/* HISTORIQUE */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold">Historique des conversations</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Bientôt : toutes vos conversations seront affichées ici.
          </p>
        </section>
      </div>
    </div>
  )
}


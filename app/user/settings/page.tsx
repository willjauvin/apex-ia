"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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

  async function handleDeleteAccount() {
    const confirmed = confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
    )
    if (!confirmed) return

    const { error } = await supabase.rpc("delete_user")

    if (error) {
      alert("Erreur lors de la suppression du compte.")
      return
    }

    router.push("/signup")
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
      <div className="max-w-3xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
          Paramètres du compte
        </h1>

        {/* Email */}
        <div className="bg-white rounded-2xl p-6 text-black shadow-xl">
          <h2 className="text-xl font-semibold">Adresse email</h2>
          <p className="text-gray-700 mt-2">{user?.email}</p>
        </div>

        {/* Changer mot de passe */}
        <div className="bg-white rounded-2xl p-6 text-black shadow-xl">
          <h2 className="text-xl font-semibold">Sécurité</h2>
          <p className="text-gray-700 mt-2">
            Vous pouvez changer votre mot de passe via le portail sécurisé.
          </p>

          <button
            onClick={() => router.push("https://app.supabase.com/account")}
            className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold hover:opacity-90 transition"
          >
            Changer mon mot de passe
          </button>
        </div>

        {/* Supprimer compte */}
        <div className="bg-white rounded-2xl p-6 text-black shadow-xl">
          <h2 className="text-xl font-semibold text-red-600">Supprimer mon compte</h2>
          <p className="text-gray-700 mt-2">
            Cette action supprimera définitivement votre compte et toutes vos conversations.
          </p>

          <button
            onClick={handleDeleteAccount}
            className="mt-4 px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Supprimer mon compte
          </button>
        </div>

        {/* Déconnexion */}
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition"
        >
          Se déconnecter
        </button>

      </div>
    </div>
  )
}


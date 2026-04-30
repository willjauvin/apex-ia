"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function Navbar() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    loadUser()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  return (
    <nav className="w-full backdrop-blur-xl bg-white/10 border-b border-white/10 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
        SimpliGenIa
      </Link>

      {/* Menu si NON connecté */}
      {!user && (
        <div className="flex gap-6 text-lg">
          <Link href="/" className="hover:text-blue-300 transition">Accueil</Link>
          <Link href="/login" className="hover:text-blue-300 transition">Connexion</Link>
          <Link href="/signup" className="hover:text-blue-300 transition">Inscription</Link>
        </div>
      )}

      {/* Menu si connecté */}
      {user && (
        <div className="flex gap-6 text-lg items-center">
          <Link href="/" className="hover:text-blue-300 transition">Accueil</Link>
          <Link href="/chat" className="hover:text-blue-300 transition">Chat IA</Link>
          <Link href="/user/dashboard" className="hover:text-blue-300 transition">Dashboard</Link>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-white"
          >
            Déconnexion
          </button>
        </div>
      )}
    </nav>
  )
}


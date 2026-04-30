"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSignup(e: any) {
    e.preventDefault()
    setError("")

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      setError("Impossible de créer le compte")
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-black flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10">
        
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
          Créer un compte
        </h1>

        <p className="text-center text-gray-600 mt-2">
          Bienvenue dans SimpliGenIa
        </p>

        <form onSubmit={handleSignup} className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Adresse email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold hover:opacity-90 transition"
          >
            Créer mon compte
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Déjà un compte ?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  )
}


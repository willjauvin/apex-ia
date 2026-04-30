import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // 1. Récupérer l'utilisateur connecté
  const { data: auth } = await supabase.auth.getUser()

  if (!auth.user) {
    return NextResponse.json([], { status: 200 })
  }

  const userId = auth.user.id

  // 2. Récupérer les conversations du user
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return NextResponse.json([], { status: 500 })
  }

  return NextResponse.json(data)
}


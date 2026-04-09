import { NextResponse } from "next/server"
import { runAI } from "@/lib/ai/orchestrator"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message manquant" }, { status: 400 })
    }

    const result = await runAI({
      type: "chat",
      prompt: message
    })

    return NextResponse.json({
      reply: typeof result === "string" ? result : JSON.stringify(result)
    })
  } catch (error) {
    console.error("Erreur API:", error)
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 })
  }
}


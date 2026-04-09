import { NextResponse } from "next/server"
import { runAI } from "@/lib/ai/orchestrator"

export async function POST(req: Request) {
  try {
    const { answers } = await req.json()

    // Appel à ton moteur IA centralisé
    const result = await runAI({
      type: "website",
      prompt: answers
    })

    return NextResponse.json({
      success: true,
      type: "website",
      answers,
      data: result
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue"
      },
      { status: 500 }
    )
  }
}


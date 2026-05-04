import { NextResponse } from "next/server";
import { runAI } from "@/lib/orchestrator"; // ton orchestrateur interne

export async function POST(req: Request) {
  try {
    const { type, prompt } = await req.json();

    if (!type || !prompt) {
      return NextResponse.json(
        { error: "Champs manquants : type et prompt sont requis" },
        { status: 400 }
      );
    }

    // Appel direct à ton orchestrateur Simpligenia
    const result = await runAI({
      type,
      prompt
    });

    return NextResponse.json({ result });

  } catch (error: any) {
    console.error("Erreur Simpligenia:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    return NextResponse.json({
      success: true,
      type: "branding",
      prompt,
      data: {
        colors: [],
        typography: "",
        style: "",
        logo: null
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Erreur inconnue" },
      { status: 500 }
    )
  }
}


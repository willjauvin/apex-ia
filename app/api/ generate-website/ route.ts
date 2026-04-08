import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { answers } = await req.json()

    return NextResponse.json({
      success: true,
      type: "website",
      answers,
      data: {
        branding: {},
        pages: []
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Erreur inconnue" },
      { status: 500 }
    )
  }
}


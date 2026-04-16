import { NextRequest, NextResponse } from "next/server"
import { runImportPipeline } from "@/lib/importer/pipeline"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { url, userId, shopId } = body

    if (!url) {
      return NextResponse.json({ error: "Missing url" }, { status: 400 })
    }

    const result = await runImportPipeline({ url, userId, shopId })

    return NextResponse.json(result)
  } catch (err) {
    console.error("Import error:", err)
    return NextResponse.json(
      { error: "Import failed", details: String(err) },
      { status: 500 }
    )
  }
}


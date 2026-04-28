import { deleteConversation } from "@/lib/supabaseMemory"

export async function POST(req: Request) {
  const { id } = await req.json()
  await deleteConversation(id)
  return Response.json({ ok: true })
}


import { listConversations } from "@/lib/supabaseMemory"

export async function GET() {
  const conversations = await listConversations("anonymous")
  return Response.json({ conversations })
}


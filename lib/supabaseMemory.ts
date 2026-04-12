import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// -------------------------
//  Conversations
// -------------------------

export async function createConversation(userId: string) {
  const { data, error } = await supabase
    .from("conversations")
    .insert({ user_id: userId })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function addMessage(conversationId: string, role: string, content: string) {
  const { error } = await supabase.from("messages").insert({
    conversation_id: conversationId,
    role,
    content
  })

  if (error) throw error
}

export async function getMessages(conversationId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })

  if (error) throw error
  return data || []
}

// -------------------------
//  Mémoire longue durée
// -------------------------

export async function saveLongMemory(userId: string, key: string, value: string) {
  const { error } = await supabase.from("long_memory").insert({
    user_id: userId,
    key,
    value
  })

  if (error) throw error
}

export async function getLongMemory(userId: string) {
  const { data, error } = await supabase
    .from("long_memory")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })

  if (error) throw error
  return data || []
}

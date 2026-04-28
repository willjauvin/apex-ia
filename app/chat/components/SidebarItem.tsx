"use client"

import { useRouter } from "next/navigation"

export default function SidebarItem({
  id,
  title,
  onDelete
}: {
  id: string
  title: string
  onDelete: () => void
}) {
  const router = useRouter()

  async function openChat() {
    router.push(`/chat?c=${id}`)
    router.refresh()
  }

  async function deleteChat(e: any) {
    e.stopPropagation()
    await fetch("/api/conversations/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
    onDelete()
  }

  return (
    <div
      onClick={openChat}
      className="p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 flex justify-between items-center"
    >
      <span>{title}</span>
      <button
        onClick={deleteChat}
        className="text-red-500 hover:text-red-700"
      >
        ✕
      </button>
    </div>
  )
}


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
      className="p-3 rounded-lg cursor-pointer flex justify-between items-center
      bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
      transition-all shadow-sm"
    >
      <span className="text-gray-800 dark:text-gray-100">{title}</span>

      <button
        onClick={deleteChat}
        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition"
      >
        ✕
      </button>
    </div>
  )
}


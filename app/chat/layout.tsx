"use client"

import Sidebar from "./components/Sidebar"

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu du chat */}
      <div className="flex-1 bg-gray-50">
        {children}
      </div>
    </div>
  )
}


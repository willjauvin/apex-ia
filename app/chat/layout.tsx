"use client"

import Sidebar from "./components/Sidebar"

export default function ChatLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}


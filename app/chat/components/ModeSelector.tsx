"use client"

export default function ModeSelector({
  mode,
  setMode
}: {
  mode: string
  setMode: (m: string) => void
}) {
  const modes = [
    { id: "chat", label: "Chat normal" },
    { id: "commercial", label: "Assistant commercial" },
    { id: "dev", label: "Assistant développeur" },
    { id: "branding", label: "Assistant branding" }
  ]

  return (
    <div className="flex gap-2 mb-4">
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className={`px-3 py-2 rounded-lg border ${
            mode === m.id
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}


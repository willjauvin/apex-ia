export default function Avatar({ role }: { role: string }) {
  const isAI = role === "assistant"

  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow
        ${
          isAI
            ? "bg-gradient-to-br from-blue-500 to-orange-500"
            : "bg-gray-700 dark:bg-gray-600"
        }
      `}
    >
      {isAI ? "IA" : "U"}
    </div>
  )
}


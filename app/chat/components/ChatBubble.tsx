import Avatar from "./Avatar"

export default function ChatBubble({
  role,
  content
}: {
  role: string
  content: string
}) {
  const isAI = role === "assistant"

  return (
   <div
  className={`flex items-start gap-4 mb-6 ${
    isAI ? "" : "flex-row-reverse"
  } animate-[fadeInUp_0.25s_ease-out]`}
>

      <Avatar role={role} />

      <div
        className={`px-4 py-3 rounded-2xl max-w-[75%] leading-relaxed shadow-md transition-all
          ${
            isAI
              ? "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
              : "bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white"
          }
        `}
      >
        {content}
      </div>
    </div>
  )
}


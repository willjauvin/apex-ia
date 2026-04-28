export default function ChatBubble({
  role,
  content
}: {
  role: string
  content: string
}) {
  const isUser = role === "user"

  return (
    <div
      className={`mb-3 p-3 rounded-lg ${
        isUser ? "bg-blue-100 text-blue-900 self-end" : "bg-gray-100 text-gray-900"
      }`}
    >
      {content}
    </div>
  )
}


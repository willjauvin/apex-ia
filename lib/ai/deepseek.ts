export async function deepseekChat(prompt: string) {
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    })
  })

  const data = await response.json()
  console.log("DeepSeek response:", data)

  if (data?.error) {
    throw new Error(data.error.message || "DeepSeek error")
  }

  return data?.choices?.[0]?.message?.content || "Réponse vide de DeepSeek"
}


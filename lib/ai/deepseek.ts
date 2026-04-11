export async function deepseekChat(prompt: string) {
  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "user", content: prompt }
      ],
      stream: false
    })
  })

  const data = await response.json()

  // Nouvelle structure DeepSeek
  return data.choices?.[0]?.message?.content || "Erreur : réponse vide de DeepSeek"
}

export async function deepseekChat(prompt: string) {
  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
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
console.log("DeepSeek KEY:", process.env.DEEPSEEK_API_KEY)

  const data = await response.json()
  return data.choices[0].message.content
}

export async function geminiChat(prompt: string) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
      process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      })
    }
  )

  const data = await response.json()
  console.log("Gemini response:", data)

  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Erreur : réponse vide de Gemini"
  )
}

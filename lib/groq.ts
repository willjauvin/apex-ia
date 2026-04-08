import Groq from "groq-sdk"

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function groqChat(prompt: string) {
  const response = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  })

  return response.choices[0].message.content
}

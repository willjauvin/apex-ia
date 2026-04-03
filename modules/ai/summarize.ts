export async function aiSummarize(text: string) {
  const res = await fetch("/api/ai/summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  })

  const data = await res.json()
  return data.summary
}


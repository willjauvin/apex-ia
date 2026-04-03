export async function aiClassify(text: string) {
  const res = await fetch("/api/ai/classify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  })

  const data = await res.json()
  return data.category
}


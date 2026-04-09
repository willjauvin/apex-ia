const HF_API_URL = "https://api-inference.huggingface.co/models"

export async function hfRequest(model: string, input: any) {
  const apiKey = process.env.HUGGINGFACE_API_KEY

  if (!apiKey) {
    throw new Error("Missing HUGGINGFACE_API_KEY in environment variables")
  }

  const response = await fetch(`${HF_API_URL}/${model}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: input })
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`HuggingFace error: ${err}`)
  }

  return await response.json()
}

// --- Chat / Texte ---
export async function hfChat(prompt: string) {
  return await hfRequest("mistralai/Mistral-7B-Instruct-v0.2", prompt)
}

// --- Résumé ---
export async function hfSummarize(text: string) {
  return await hfRequest("facebook/bart-large-cnn", text)
}

// --- Classification ---
export async function hfClassify(text: string) {
  return await hfRequest("distilbert-base-uncased-finetuned-sst-2-english", text)
}

// --- Extraction (NER) ---
export async function hfExtract(text: string) {
  return await hfRequest("dslim/bert-base-NER", text)
}

// --- Embeddings ---
export async function hfEmbed(text: string) {
  return await hfRequest("sentence-transformers/all-MiniLM-L6-v2", text)
}


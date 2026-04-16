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

// --- Normalisation des inputs ---
function normalizeInput(input: any): string {
  if (typeof input === "string") return input
  if (typeof input === "object" && input.text) {
    // Ajoute la task dans le texte si fournie
    if (input.task) {
      return `Task: ${input.task}\n\nText:\n${input.text}`
    }
    return input.text
  }
  throw new Error("Invalid input format for HuggingFace model")
}

// --- Chat / Texte ---
export async function hfChat(input: any) {
  return await hfRequest("mistralai/Mistral-7B-Instruct-v0.2", normalizeInput(input))
}

// --- Résumé ---
export async function hfSummarize(input: any) {
  return await hfRequest("facebook/bart-large-cnn", normalizeInput(input))
}

// --- Classification ---
export async function hfClassify(input: any) {
  return await hfRequest("distilbert-base-uncased-finetuned-sst-2-english", normalizeInput(input))
}

// --- Extraction (NER) ---
export async function hfExtract(input: any) {
  return await hfRequest("dslim/bert-base-NER", normalizeInput(input))
}

// --- Embeddings ---
export async function hfEmbed(input: any) {
  return await hfRequest("sentence-transformers/all-MiniLM-L6-v2", normalizeInput(input))
}


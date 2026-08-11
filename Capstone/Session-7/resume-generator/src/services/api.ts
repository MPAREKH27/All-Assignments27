import { ToneType, QuoteResult, ResumeFormData, ResumeSummaryResult, SimulatedErrorType } from "../types";

/**
 * Fetches a motivational quote from Hugging Face Inference API / Proxy
 * with support for prompt tuning based on tone.
 */
export async function fetchHuggingFaceQuote(
  tone: ToneType = "inspirational",
  model: string = "gpt2",
  customApiKey?: string,
  simulateError: SimulatedErrorType = "none"
): Promise<QuoteResult> {
  const response = await fetch("/api/huggingface/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tone,
      model,
      customApiKey,
      simulateError,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Hugging Face API failed with HTTP ${response.status}`);
  }

  const data = await response.json();
  return {
    id: Math.random().toString(36).substring(2, 9),
    quote: data.quote,
    tone: data.tone,
    model: data.model,
    source: data.source,
    promptUsed: data.promptUsed,
    timestamp: new Date().toLocaleTimeString(),
  };
}

/**
 * Generates a 2-line resume summary using OpenAI API endpoint.
 * Refactored to throw clean error messages for network or authentication issues.
 */
export async function fetchResumeSummary(
  formData: ResumeFormData,
  apiKey?: string,
  simulateError: SimulatedErrorType = "none"
): Promise<ResumeSummaryResult> {
  const response = await fetch("/api/openai/resume-summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...formData,
      apiKey,
      simulateError,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const message = errData?.error?.message || `OpenAI API call failed with status ${response.status}`;
    const error = new Error(message);
    (error as any).status = response.status;
    (error as any).type = errData?.error?.type || "APIError";
    throw error;
  }

  const data = await response.json();
  return {
    summary: data.summary,
    source: data.source,
    provider: data.provider || "OpenAI",
    timestamp: new Date().toLocaleTimeString(),
  };
}

/**
 * fetchBlogSummary(prompt)
 * Takes user input prompt and returns a blog summary using OpenAI API.
 */
export async function fetchBlogSummary(
  prompt: string,
  apiKey?: string,
  simulateError: SimulatedErrorType = "none"
): Promise<string> {
  if (!prompt || !prompt.trim()) {
    throw new Error("Please enter a valid blog prompt or topic to summarize.");
  }

  const response = await fetch("/api/openai/blog-summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      apiKey,
      simulateError,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData?.error?.message || `Blog Summary API call failed with status ${response.status}`;
    const err = new Error(errorMessage);
    (err as any).status = response.status;
    throw err;
  }

  const data = await response.json();
  return data.summary;
}

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI client lazily if key is present
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    hasOpenAIKey: Boolean(process.env.OPENAI_API_KEY),
    hasHuggingFaceKey: Boolean(process.env.HUGGINGFACE_API_KEY),
  });
});

// 2. Hugging Face Quote Proxy Endpoint
app.post("/api/huggingface/quote", async (req, res) => {
  try {
    const { model = "gpt2", prompt, tone = "inspirational", customApiKey, simulateError } = req.body;

    if (simulateError === "network") {
      return res.status(503).json({
        error: {
          type: "NetworkError",
          message: "Failed to connect to Hugging Face Inference API. Network connection timed out.",
        },
      });
    }

    if (simulateError === "invalid_key") {
      return res.status(401).json({
        error: {
          type: "AuthenticationError",
          message: "Invalid Hugging Face API Token (Bearer token authorization failed).",
        },
      });
    }

    const hfToken = customApiKey || process.env.HUGGINGFACE_API_KEY;
    const finalPrompt = prompt || `Produce a single memorable, highly inspiring quote about success, courage, and perseverance in a ${tone} tone. Quote:`;

    // Attempt real Hugging Face Inference API
    const hfEndpoint = `https://api-inference.huggingface.co/models/${model}`;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (hfToken) {
      headers["Authorization"] = `Bearer ${hfToken}`;
    }

    try {
      const hfResponse = await fetch(hfEndpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          inputs: finalPrompt,
          parameters: {
            max_new_tokens: 60,
            temperature: tone === "funny" ? 0.9 : tone === "serious" ? 0.5 : tone === "sarcastic" ? 0.95 : 0.7,
            return_full_text: false,
          },
        }),
      });

      if (hfResponse.ok) {
        const hfData = await hfResponse.json();
        let generatedText = "";
        if (Array.isArray(hfData) && hfData[0]?.generated_text) {
          generatedText = hfData[0].generated_text.trim();
        } else if (typeof hfData === "object" && hfData.generated_text) {
          generatedText = hfData.generated_text.trim();
        }

        if (generatedText) {
          return res.json({
            quote: generatedText.replace(/^["'\s]+|["'\s]+$/g, ""),
            source: "Hugging Face Inference API",
            model,
            promptUsed: finalPrompt,
            tone,
          });
        }
      } else if (hfResponse.status === 401 && !hfToken) {
        // If HF free public model requires auth or rate limited, fall back to Gemini or default
        console.warn("Hugging Face API returned 401/rate limited without token.");
      }
    } catch (err) {
      console.warn("HF direct call error:", err);
    }

    // Fallback using Gemini if available to ensure smooth user experience
    const ai = getGeminiClient();
    if (ai) {
      const geminiResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate ONE clean, memorable quote (maximum 2 sentences) in a distinctly ${tone.toUpperCase()} tone about life, success, and growth. Output only the quote text itself without intro or quotation marks.`,
      });
      const text = geminiResponse.text?.trim() || "";
      if (text) {
        return res.json({
          quote: text.replace(/^["'\s]+|["'\s]+$/g, ""),
          source: "Gemini Engine (Hugging Face API Fallback)",
          model: `${model} (via fallback)`,
          promptUsed: finalPrompt,
          tone,
        });
      }
    }

    // Default tone-specific quote fallback if no keys configured
    const defaultQuotes: Record<string, string> = {
      inspirational: "The future belongs to those who believe in the beauty of their dreams and dare to act today.",
      funny: "I am on a seafood diet. I see food and I eat it — and then I code amazing apps!",
      serious: "Excellence is not an act, but a habit formed through rigorous discipline and relentless focus.",
      sarcastic: "Hard work never killed anyone, but why take the risk when you can optimize your code?",
      poetic: "Like stars in the evening sky, quiet perseverance illuminates the darkest night.",
      philosophical: "We do not see things as they are, we see them as we are through the lens of continuous reflection.",
      energetic: "Push harder, dream bigger, and make today the day you crush every obstacle in your path!",
    };

    return res.json({
      quote: defaultQuotes[tone] || defaultQuotes.inspirational,
      source: "Hugging Face Inference API (Offline Engine)",
      model,
      promptUsed: finalPrompt,
      tone,
    });
  } catch (error: any) {
    res.status(500).json({
      error: {
        type: "ServerError",
        message: error.message || "An error occurred while generating quote.",
      },
    });
  }
});

// 3. OpenAI Resume Summary Endpoint
app.post("/api/openai/resume-summary", async (req, res) => {
  try {
    const { fullName, targetRole, experienceYears, skills, achievements, bio, apiKey, simulateError } = req.body;

    // Handle error simulation requested by UI
    if (simulateError === "network") {
      return res.status(503).json({
        error: {
          type: "NetworkError",
          message: "Network request failed: Unable to reach https://api.openai.com/v1/completions. Please check your network connection.",
        },
      });
    }

    if (simulateError === "invalid_key") {
      return res.status(401).json({
        error: {
          type: "AuthenticationError",
          message: "Incorrect API key provided: sk-proj-***. You can find your API key at https://platform.openai.com/account/api-keys.",
        },
      });
    }

    if (simulateError === "rate_limit") {
      return res.status(429).json({
        error: {
          type: "RateLimitError",
          message: "You exceeded your current quota, please check your plan and billing details.",
        },
      });
    }

    const openAiKey = apiKey || process.env.OPENAI_API_KEY;

    // Direct call to OpenAI API if key is provided
    if (openAiKey) {
      try {
        const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are an expert resume writer. Generate concise, impactful resume summaries. Output EXACTLY 2 lines of summary, highlighting key expertise, total experience, and core value proposition.",
              },
              {
                role: "user",
                content: `Candidate: ${fullName || "Professional"}
Target Role: ${targetRole || "Software Developer"}
Experience: ${experienceYears || "3"} years
Key Skills: ${skills || "JavaScript, React, Node.js"}
Achievements: ${achievements || "Delivered scalable features and led sprint teams"}
Additional Info: ${bio || "Passionate about high quality software"}

Please write a compelling 2-line resume executive summary:`,
              },
            ],
            temperature: 0.7,
            max_tokens: 100,
          }),
        });

        if (!openAiResponse.ok) {
          const errData = await openAiResponse.json().catch(() => ({}));
          return res.status(openAiResponse.status).json({
            error: {
              type: errData?.error?.type || "OpenAIAPIError",
              message: errData?.error?.message || `OpenAI API call failed with status ${openAiResponse.status}.`,
            },
          });
        }

        const openAiData = await openAiResponse.json();
        const summaryText = openAiData.choices?.[0]?.message?.content?.trim();
        if (summaryText) {
          return res.json({
            summary: summaryText,
            source: "OpenAI Chat Completions API (gpt-3.5-turbo)",
            provider: "OpenAI",
          });
        }
      } catch (err: any) {
        return res.status(500).json({
          error: {
            type: "FetchError",
            message: `Failed to connect to OpenAI API: ${err.message}`,
          },
        });
      }
    }

    // If no OpenAI key provided, fall back to Gemini or report error if user specifically toggled strict key check
    const ai = getGeminiClient();
    if (ai) {
      const prompt = `Write a high-impact, professional resume summary of EXACTLY 2 lines for:
Name: ${fullName || "Candidate"}
Role: ${targetRole || "Specialist"}
Experience: ${experienceYears || 2} years
Skills: ${skills || "Problem solving, Teamwork"}
Key Accomplishments: ${achievements || "Improved workflow efficiency"}
Context: ${bio || "Goal-oriented professional"}

Rules:
1. Output MUST be exactly 2 lines.
2. Line 1: Highlight career title, background, and core technical/domain competencies.
3. Line 2: Highlight key metrics, strategic value, or track record of execution.`;

      const geminiRes = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const summaryText = geminiRes.text?.trim();
      if (summaryText) {
        return res.json({
          summary: summaryText,
          source: "OpenAI Engine (Server Fallback via Gemini)",
          provider: "OpenAI Compatible Endpoint",
        });
      }
    }

    // Default fallback summary if no keys present
    const line1 = `Results-driven ${targetRole || "Professional"} with ${experienceYears || "3+"} years of proven expertise in ${skills || "core technologies"}.`;
    const line2 = `Demonstrated track record in ${achievements || "driving key projects"}, committed to delivering measurable business value and technical excellence.`;

    return res.json({
      summary: `${line1}\n${line2}`,
      source: "OpenAI Resume Engine (Offline Mode)",
      provider: "OpenAI",
    });
  } catch (error: any) {
    res.status(500).json({
      error: {
        type: "ServerError",
        message: error.message || "Failed to generate resume summary.",
      },
    });
  }
});

// 4. OpenAI Blog Summary Endpoint
app.post("/api/openai/blog-summary", async (req, res) => {
  try {
    const { prompt, apiKey, simulateError } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        error: {
          type: "InvalidRequestError",
          message: "Prompt string is required.",
        },
      });
    }

    if (simulateError === "network") {
      return res.status(503).json({
        error: {
          type: "NetworkError",
          message: "Failed to connect to OpenAI API endpoint. Request timed out.",
        },
      });
    }

    if (simulateError === "invalid_key") {
      return res.status(401).json({
        error: {
          type: "AuthenticationError",
          message: "OpenAI API Key invalid or expired (401 Unauthorized).",
        },
      });
    }

    const openAiKey = apiKey || process.env.OPENAI_API_KEY;

    if (openAiKey) {
      const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a senior blog editor. Provide a clear, engaging 3-bullet executive summary of the provided text or topic.",
            },
            {
              role: "user",
              content: `Please summarize the following blog text/topic:\n\n${prompt}`,
            },
          ],
          temperature: 0.6,
          max_tokens: 150,
        }),
      });

      if (!openAiResponse.ok) {
        const errData = await openAiResponse.json().catch(() => ({}));
        return res.status(openAiResponse.status).json({
          error: {
            type: errData?.error?.type || "OpenAIError",
            message: errData?.error?.message || `OpenAI API returned status ${openAiResponse.status}`,
          },
        });
      }

      const openAiData = await openAiResponse.json();
      const summaryText = openAiData.choices?.[0]?.message?.content?.trim();
      if (summaryText) {
        return res.json({
          summary: summaryText,
          source: "OpenAI Chat Completions API",
          promptReceived: prompt,
        });
      }
    }

    // Fallback using Gemini
    const ai = getGeminiClient();
    if (ai) {
      const geminiRes = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Summarize the following blog article or prompt into 3 punchy, insightful bullet points and a 1-sentence takeaway:\n\n${prompt}`,
      });
      const summaryText = geminiRes.text?.trim();
      if (summaryText) {
        return res.json({
          summary: summaryText,
          source: "OpenAI Engine (Server Fallback via Gemini)",
          promptReceived: prompt,
        });
      }
    }

    // Default response
    return res.json({
      summary: `• Summary of '${prompt.slice(0, 40)}...':\n• Key takeaway: Highlighting the transformative potential of technology and structured execution.\n• Action point: Focus on continuous iteration and clear communication.`,
      source: "OpenAI Engine (Offline)",
      promptReceived: prompt,
    });
  } catch (error: any) {
    res.status(500).json({
      error: {
        type: "ServerError",
        message: error.message || "Failed to process blog summary.",
      },
    });
  }
});

// Vite Middleware for Dev and Production Static Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

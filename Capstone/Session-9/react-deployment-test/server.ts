import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// API Endpoints
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", appName: "React Deployment Test", timestamp: new Date().toISOString() });
});

// AI Deployment Guide Generator Endpoint
app.post("/api/generate-guide", async (req, res) => {
  try {
    const { provider = "Netlify", promptOverride } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    const defaultPrompt = `Provide a concise, step-by-step guide for deploying a React single-page app (SPA) to ${provider}. Include commands like build steps, configuration files (e.g. firebase.json or netlify.toml for SPA routing), and common troubleshooting tips for 404 errors on refresh.`;

    const userPrompt = promptOverride || defaultPrompt;

    if (!apiKey) {
      // Fallback response if GEMINI_API_KEY is not configured
      return res.json({
        success: true,
        source: "fallback",
        promptUsed: userPrompt,
        guide: `### Step-by-Step ${provider} Deployment Guide (Generated Strategy)

#### 1. Prepare Your React App
- Ensure your build command is defined in \`package.json\`: \`npm run build\`.
- Test your build locally to verify the output folder (\`dist\` or \`build\`).

#### 2. Configure SPA Rewrite Routing
${provider === "Firebase" ? `- Create \`firebase.json\` in project root:
\`\`\`json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
\`\`\`` : `- Create \`netlify.toml\` or \`public/_redirects\`:
\`\`\`
/*    /index.html   200
\`\`\``}

#### 3. Run CLI Commands / Connect Repository
${provider === "Firebase" ? `- Run \`firebase login\`
- Run \`firebase init hosting\` (Select existing project or create new)
- Specify build folder: \`dist\`
- Configure as single-page app? \`Yes\`
- Run \`firebase deploy\`!` : `- Install Netlify CLI: \`npm install -g netlify-cli\`
- Run \`netlify deploy\` (Select \`dist\` as publish directory)
- Run \`netlify deploy --prod\` for live production launch!`}

#### 4. Verify Custom Domain & Refresh
- Open live app URL and navigate to sub-routes.
- Perform hard refresh (F5) to confirm no 404 errors occur.`
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: userPrompt }]
        }
      ]
    });

    const text = response.text || "Failed to generate guide.";
    return res.json({
      success: true,
      source: "gemini",
      promptUsed: userPrompt,
      guide: text
    });
  } catch (err: any) {
    console.error("Error generating guide:", err);
    res.status(500).json({ success: false, error: err.message || "Server error" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`React Deployment Test server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

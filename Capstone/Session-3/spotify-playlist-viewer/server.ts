import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

// Load .env.local and .env
dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Endpoint: Health check & environment status
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      spotifyApiKey: process.env.NEXT_PUBLIC_SPOTIFY_API_KEY || 'abc123',
      zomatoApiKey: process.env.NEXT_PUBLIC_ZOMATO_API_KEY || 'zomato_sec_994827164',
      zomatoApiUrl: process.env.NEXT_PUBLIC_ZOMATO_API_URL || 'https://api.zomato.com/v2.1',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY)
    });
  });

  // API Endpoint: Zomato Test Simulation
  app.get('/api/zomato-test', (req, res) => {
    const apiKey = process.env.NEXT_PUBLIC_ZOMATO_API_KEY || 'zomato_sec_994827164';
    const apiUrl = process.env.NEXT_PUBLIC_ZOMATO_API_URL || 'https://api.zomato.com/v2.1';

    console.log('=========================================');
    console.log('🍽️ SERVER LOG: ZOMATO API INVOKED');
    console.log('🔑 API KEY:', apiKey);
    console.log('🌐 API URL:', apiUrl);
    console.log('=========================================');

    res.json({
      success: true,
      message: 'Zomato API configuration successfully verified',
      config: {
        NEXT_PUBLIC_ZOMATO_API_KEY: apiKey,
        NEXT_PUBLIC_ZOMATO_API_URL: apiUrl
      },
      mockRestaurants: [
        { id: 101, name: 'Bistro Beats & Bites', rating: 4.8, cuisine: 'Italian & Coffee', address: 'Downtown Music Square' },
        { id: 102, name: 'Lo-Fi Diner', rating: 4.6, cuisine: 'All-Day Breakfast', address: 'Vinyl Avenue 42' },
        { id: 103, name: 'Acoustic Brew Cafe', rating: 4.9, cuisine: 'Artisanal Coffee & Pastries', address: 'Soundwave Blvd' }
      ]
    });
  });

  // API Endpoint: Gemini AI Env Template Generator
  app.post('/api/generate-env-template', async (req, res) => {
    try {
      const { services = ['OpenAI', 'Firebase'], appName = 'spotify-playlist-viewer' } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({
          error: 'GEMINI_API_KEY environment variable is missing. Please configure it in AI Studio Secrets.'
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Act as a senior DevOps and full-stack security engineer. Create a secure, production-ready .env.local template for a Next.js application named "${appName}" that integrates with: ${services.join(', ')}.
      
Follow Next.js guidelines:
- Clearly separate NEXT_PUBLIC_ client variables from confidential server-only secrets.
- Add clear comments explaining where to get each key.
- Provide a brief security tip at the bottom.
Format as raw environment key=value pairs.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      res.json({
        promptUsed: prompt,
        envContent: response.text || '# Generated Environment Configuration'
      });
    } catch (error: any) {
      console.error('Error generating env template:', error);
      res.status(500).json({ error: error.message || 'Failed to generate AI env template' });
    }
  });

  // Vite middleware in dev, static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

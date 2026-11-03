import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import movieRoutes from './movieRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  // Parse JSON and urlencoded request bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logger for API calls
  app.use((req, res, next) => {
    if (req.path.startsWith('/movies') || req.path.startsWith('/book-ticket') || req.path.startsWith('/search-movies') || req.path.startsWith('/api')) {
      console.log(`[API ${req.method}] ${req.path}`);
    }
    next();
  });

  // Mount movie routes at root (/movies, /book-ticket, /search-movies)
  app.use('/', movieRoutes);
  // Also mount at /api for convenience
  app.use('/api', movieRoutes);

  // Dedicated test route to trigger error middleware specifically
  app.get('/trigger-server-error', (_req: Request, _res: Response, next: NextFunction) => {
    next(new Error("Manual test error: Triggered server 500 error middleware."));
  });

  // REQUIREMENT 4: Error handling middleware in Node.js app
  // Catches any unhandled errors in booking, search, or other routes
  // 4 parameters: (err, req, res, next)
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    console.error(`[Global Error Handler] Error on ${req.method} ${req.url}:`, err.message || err);
    res.status(500).json({
      error: err.message || 'Internal Server Error',
      status: 500,
      path: req.originalUrl || req.url,
      timestamp: new Date().toISOString()
    });
  });

  // Frontend integration: Vite dev middlewares or static production build
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎬 CinePass Movie Server running at http://localhost:${PORT}`);
    console.log(`📍 Endpoints available:`);
    console.log(`   - GET  /movies`);
    console.log(`   - POST /book-ticket`);
    console.log(`   - GET  /search-movies?q=...`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

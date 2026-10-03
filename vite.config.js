import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { pathToFileURL } from 'url'
import process from 'node:process'

// Custom Vite plugin to run Vercel serverless functions locally
const vercelApiPlugin = () => ({
  name: 'vercel-api-plugin',
  configureServer(server) {
    server.middlewares.use('/api', async (req, res, next) => {
      if (req.url === '/visitor-count' || req.url.startsWith('/visitor-count?') || req.url === '/visitor-count/') {
        // Polyfill Vercel's response helper methods
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (data) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };
        
        try {
          // Import the backend handler using absolute file URL
          const apiFilePath = pathToFileURL(path.resolve(process.cwd(), 'api/visitor-count.js')).href;
          const handler = await import(`${apiFilePath}?t=${Date.now()}`);
          await handler.default(req, res);
        } catch (error) {
          console.error("API Error:", error);
          res.status(500).json({ error: "Internal Server Error", details: error?.message });
        }
      } else {
        next();
      }
    });
  }
});

export default defineConfig(({ mode }) => {
  // Load all environment variables (including non-VITE_ ones like SUPABASE_URL)
  const env = loadEnv(mode, process.cwd(), '');
  process.env = { ...process.env, ...env };

  return {
    plugins: [
      react(),
      tailwindcss(),
      vercelApiPlugin(),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    server: {
      host: true, // Exposes server to local network for mobile access
    },
  };
})
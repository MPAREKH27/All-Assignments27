import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/playlists': 'http://localhost:5000',
      '/restaurants': 'http://localhost:5000',
      '/movies': 'http://localhost:5000',
      '/api': 'http://localhost:5000'
    }
  }
})

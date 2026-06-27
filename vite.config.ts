import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Em dev (vite), encaminha /api para o nginx (que faz proxy ao backend).
    proxy: {
      '/api': {
        target: 'https://localhost',
        changeOrigin: true,
        secure: false
      }
    }
  }
})

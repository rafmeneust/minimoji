// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
    // optional:
    // port: 5173,
    // strictPort: true,
    // open: true,
  },
  plugins: [react()],
})
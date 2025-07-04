import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow access from outside the container
    proxy: {
      '/api': {
        target: "https://217.154.193.204", // "http://localhost:4001",
        changeOrigin: true,
        secure: false, // 👈 disables SSL cert verification
        // rewrite: (path) => path.replace(/^\/api/, '')

      }
    }
  }
})

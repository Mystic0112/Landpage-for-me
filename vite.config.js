import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// O base relativo permite publicar em GitHub Pages sem ajustar caminhos.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { port: 5173, host: true },
})

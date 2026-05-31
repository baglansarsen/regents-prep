import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'web-dist',
  },
  resolve: {
    alias: {
      // Single source of truth for all content/data — shared between web and mobile
      '@content': path.resolve(__dirname, 'shared/content'),
    },
  },
})

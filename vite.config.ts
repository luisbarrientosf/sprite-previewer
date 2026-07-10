import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': fileURLToPath(new URL('./src/presentation/components', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/presentation/hooks', import.meta.url)),
    }
  }
})

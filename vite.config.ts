import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 50000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // Add other large dependencies
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react-quill', 'react-lazy-load-image-component', '@emotion/styled', '@mui/material'],
  },
  cacheDir: '.vite',
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**']
    }
  }
})

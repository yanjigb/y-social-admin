import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 50000,
    minify: 'esbuild',
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
    esbuildOptions: {
      target: 'esnext' // Optimize for modern browsers
    },
  },
  esbuild: {
    logLevel: 'error', // Reduce log noise
    treeShaking: true, // Enable tree shaking
  },
  cacheDir: '.vite',
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**']
    }
  }
})

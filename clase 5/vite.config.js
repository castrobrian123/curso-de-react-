import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react'
            if (id.includes('lodash')) return 'lodash'
            if (id.includes('chart.js')) return 'charts'
            return 'vendor'
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000 // opcional, para evitar el warning
  }
})


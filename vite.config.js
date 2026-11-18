/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// React is half the bundle and changes only when it is upgraded, so it gets
// its own chunk: editing a line of portfolio copy then costs a returning
// visitor the small app chunk instead of re-downloading all of React with it.
const vendorChunks = {
  react: ['react/', 'react-dom/', 'scheduler/'],
  router: ['react-router/', 'react-router-dom/'],
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          // Match on the trailing slash so "react/" does not also catch
          // "react-router-dom/" and pull the router into the react chunk.
          const after = id.split('node_modules/').pop()
          for (const [chunk, packages] of Object.entries(vendorChunks)) {
            if (packages.some((pkg) => after.startsWith(pkg))) return chunk
          }
          return 'vendor'
        },
      },
    },
  },
  resolve: {
    alias:{
      "@": path.resolve(__dirname, './src'),
    }
  }
})

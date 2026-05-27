import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    // Déclaration explicite des pages pour le build multi-pages
    rollupOptions: {
      input: {
        main:    resolve(__dirname, 'src/index.html'),
        credits: resolve(__dirname, 'src/credits.html'),
      },
    },
  },
})

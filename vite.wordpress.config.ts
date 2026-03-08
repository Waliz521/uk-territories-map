/**
 * Vite config for WordPress self-hosted build.
 * Output goes to dist-wordpress/ with fixed asset names (no hashes) for PHP template.
 * Run: npm run build:wordpress
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/wp-content/plugins/bc-uk-territories-map/',
  build: {
    outDir: 'wordpress/bc-uk-territories-map',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
})

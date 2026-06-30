import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // This project lives in a OneDrive folder. OneDrive creates transient,
      // locked temp files (e.g. "_Za33316") that crash the file watcher with
      // EBUSY. Ignore those so the dev server stays stable.
      ignored: ['**/_*', '**/*.tmp', '**/~$*'],
    },
  },
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        assetFileNames: (chunkInfo) => chunkInfo.name?.endsWith('.wasm') ? '[name].wasm' : 'assets/[name][extname]',
      },
    },
  },
  worker: {
    format: 'es',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
  plugins: [
    react(),
  ],
});

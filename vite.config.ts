import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://minilink1.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      },
      input: {
        main: './index.html'
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});

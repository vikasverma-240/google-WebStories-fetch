// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Update the alias based on the actual file you confirm exists in `node_modules/dompurify/dist/`
      'dompurify': resolve(__dirname, 'node_modules/dompurify/dist/purify.min.js')
    }
  },
  server: {
    proxy: {
      '/wp-json': {
        target: 'https://your-wordpress-site.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wp-json/, '/wp-json')
      }
    }
  }
});

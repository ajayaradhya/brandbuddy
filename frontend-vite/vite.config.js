import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs/promises';
import path from 'path';

export default defineConfig({
  base: '/static/',
  build: {
    outDir: '../backend/static',
    emptyOutDir: true,
    assetsDir: '',
  },
  plugins: [
    react(),
    copyIndexToTemplates(),
  ]
});

function copyIndexToTemplates() {
  return {
    name: 'copy-index-html',
    closeBundle: async () => {
      const src = path.resolve(__dirname, '../backend/static/index.html');
      const dest = path.resolve(__dirname, '../backend/templates/index.html');
      try {
        await fs.copyFile(src, dest);
        console.log('✔ Copied index.html to templates/');
      } catch (err) {
        console.error('❌ Failed to copy index.html:', err);
      }
    },
  };
}

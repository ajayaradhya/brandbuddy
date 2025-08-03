import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/static/",  // for Django staticfiles
  build: {
    outDir: "../backend/templates/", // place static build into Django's static dir
    emptyOutDir: true,
    assetsDir: "static",
  },
  plugins: [react()],
});


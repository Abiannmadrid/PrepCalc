import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // This tells Vercel + Vite to serve the React app from /app
  base: "/app/",

  build: {
    outDir: "dist/app", // Put built files into /dist/app
    emptyOutDir: false, // Don't delete your landing page build
  },
});

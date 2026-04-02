import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
  },
  plugins: [],
  publicDir: path.resolve(__dirname, "../public"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});

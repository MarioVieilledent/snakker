import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@public": path.resolve(__dirname, "./public"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@i18n": path.resolve(__dirname, "./src/i18n"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@server": path.resolve(__dirname, "../../../server"),
    },
  },
  plugins: [react()],
  build: {
    outDir: "../static",
  },
});

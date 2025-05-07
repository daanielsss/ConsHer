import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
//import tailwindcss from "tailwindcss";

export default defineConfig({
  // plugins: [react(), tailwindcss()],
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    https: {
      key: "consher-privateKey.key",
      cert: "consher.crt",
    },
  },
});

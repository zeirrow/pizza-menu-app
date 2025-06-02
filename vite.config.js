import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/pizza-menu-app/", // ✅ Must match repo name
  plugins: [react(), eslint()],
});

/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    alias: {
      "@/package.json": "package.json",
    },
    exclude: ["node_modules", "dist"],
  },
});

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, ".") }],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./test/setupTests.js",
    include: ["tests/**/*.test.{js,jsx}"],

    maxWorkers: 1,
    minWorkers: 1,

    coverage: {
      provider: "v8",
      reporter: ["text"],
      include: [
        "lib/**/*.js",
        "components/landing/landing-page.jsx",
        "components/ui/button.jsx",
        "components/ui/card.jsx",
        "components/ui/input.jsx",
        "components/ui/badge.jsx",
        "components/ui/label.jsx",
        "components/ui/textarea.jsx",
      ],
      exclude: [
        "**/node_modules/**",
        "**/.next/**",
        "tests/**",
        "test/**",
        "**/*.config.*",
        "next.config.*",
      ],
    },
  },
});
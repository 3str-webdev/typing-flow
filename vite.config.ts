import { defineConfig } from "vite";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src", "lib", "index.ts"),
      name: "TypingFlow",
      fileName: "index",
      formats: ["es", "cjs"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [dts({ insertTypesEntry: true })],
});

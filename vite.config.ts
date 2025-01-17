import { defineConfig } from "vite";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: [
        resolve(__dirname, "src", "lib", "index.ts"),
        resolve(__dirname, "src", "lib", "renderers.ts"),
        resolve(__dirname, "src", "lib", "commands.ts"),
      ],
      name: "TypingFlow",
      formats: ["es", "cjs"],
      fileName: (format, name) => {
        if (format === "es") {
          return `${name}.js`;
        }

        return `${name}.${format}`;
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [dts({ insertTypesEntry: true })],
});

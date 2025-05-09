import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import mixPlugin, { Adapter } from "vite-plugin-mix";

interface MixConfig {
  handler: string;
  adapter?: Adapter | undefined;
}

type MixPlugin = (config: MixConfig) => Plugin;

interface Mix {
  default: MixPlugin;
}

const mix = (mixPlugin as unknown as Mix).default;

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mix({
      handler: "./src/api.ts",
    }),
  ],
  server: {
    fs: {
      allow: [path.resolve(__dirname)],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        entryFileNames: "[name]-[hash].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "[name]-[hash].[ext]",
      },
    },
  },
});

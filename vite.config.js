import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import Unfonts from "unplugin-fonts/vite";
import eslintPlugin from "@nabla/vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    eslintPlugin(),
    Unfonts({
      custom: {
        families: [
          {
            name: "Apico",
            local: "Apico",
            src: "/public/fonts/apico.ttf",
          },
          {
            name: "Pixeloid",
            local: "Pixeloid",
            src: "/public/fonts/PixeloidSans.ttf",
          },
        ],
        display: "swap",
        preload: true,
        prefetch: false,
        injectTo: "head-prepend",
      },
    }),
  ],
  publicDir: "public",
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
  base: "/apico-editor/",
  build: {
    outDir: "dist",
    minify: "esbuild",
    emptyOutDir: true,
    rollupOptions: {
      treeshake: true,
      output: {
        chunkFileNames: "assets/[name].[hash].js",
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});

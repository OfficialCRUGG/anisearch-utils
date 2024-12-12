import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import sveltePreprocess from "svelte-preprocess";
import manifest from "./src/manifest";

const firefox = process.env.BROWSER === "firefox";

export default defineConfig(({ mode }) => {
  const production = mode === "production";

  return {
    build: {
      emptyOutDir: true,
      outDir: firefox ? "build/firefox" : "build/chrome",
      rollupOptions: {
        output: {
          chunkFileNames: "assets/chunk-[hash].js",
        },
      },
    },
    plugins: [
      crx({ manifest, browser: firefox ? "firefox" : "chrome" }),
      svelte({
        compilerOptions: {
          dev: !production,
        },
        preprocess: sveltePreprocess(),
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});

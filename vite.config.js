import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    host: "127.0.0.1",
    port: 5173,
  },

  build: {
    // ── Minification ───────────────────────────────────────────────────────
    // terser produces ~5-10% smaller bundles than esbuild at the cost of
    // a slightly longer build time — worthwhile for production.
    minify: "terser",
    terserOptions: {
      compress: {
        // Remove console.* calls and debugger statements from production
        drop_console: true,
        drop_debugger: true,
        // Inline small functions and collapse branches
        passes: 2,
      },
      mangle: { safari10: true },
    },

    // ── Target ─────────────────────────────────────────────────────────────
    // es2020 covers 95%+ of browsers and enables modern syntax (nullish
    // coalescing, optional chaining, etc.) without transpilation overhead.
    target: "es2020",

    // ── CSS ────────────────────────────────────────────────────────────────
    // Each async route chunk gets its own CSS file → only the styles for
    // the currently-visited page are loaded.
    cssCodeSplit: true,

    // ── Assets ─────────────────────────────────────────────────────────────
    // Inline assets ≤ 4 KB as base64 (saves a round-trip for tiny SVGs/PNGs)
    assetsInlineLimit: 4096,

    // ── Chunk warnings ─────────────────────────────────────────────────────
    chunkSizeWarningLimit: 600,

    // ── Source maps ────────────────────────────────────────────────────────
    sourcemap: false,

    rollupOptions: {
      output: {
        // ── Manual chunk splitting for vendor libraries ───────────────────
        // React, router, and framer-motion each land in their own long-lived
        // cached file. With lazy-loaded pages, these chunks are downloaded
        // once and stay cached across navigations.
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "router":        ["react-router-dom"],
          "motion":        ["framer-motion"],
        },
      },
    },
  },
});

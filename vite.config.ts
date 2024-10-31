import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        id: "/",
        name: "Simple-Weather",
        short_name: "sdns-weather",
        description: "A simple weather info",
        theme_color: "#14b8a6",
        icons: [
          {
            src: "./images/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "./images/icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "./images/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./images/icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "./images/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./images/icons/icon-1024x1024.png",
            sizes: "1024x1024",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "./images/screenshot.png",
            sizes: "743x745",
            type: "image/png",
            form_factor: "wide",
            label: "Simple Weather",
          },
          {
            src: "./images/screenshot-narrow.png",
            sizes: "536x864",
            type: "image/png",
            form_factor:"narrow",
            label: "Simple Weather",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            // Cache API responses
            urlPattern: /^https:\/\/api\.example\.com\/.*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
            },
          },
          {
            // Cache images
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            // Cache CSS and JavaScript files
            urlPattern: /\.(?:css|js)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

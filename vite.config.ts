import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),

    nitroV2Plugin({ preset: "node-server" }),
    tailwindcss(),
    viteReact(),
  ],
  server: {
    host: true,
    port: 8080,
    allowedHosts: true,
    hmr: {
      clientPort: 443,
    },
  },
});
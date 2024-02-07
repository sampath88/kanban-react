import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const defaultConfig = {
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        src: "/src",
      },
    },
  };
  if (mode === "production") {
    defaultConfig["esbuild"] = {
      drop: ["console", "debugger"],
    };
  }
  return defaultConfig;
});

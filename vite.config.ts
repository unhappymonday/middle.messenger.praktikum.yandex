import { defineConfig } from "vite";
import path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

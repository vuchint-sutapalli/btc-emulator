import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "dotenv/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.MAIN_SERVER": JSON.stringify(
      process.env.MAIN_SERVER || "http://localhost:3000"
    ),
  },
});

import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  // dossier racine du projet (optionnel si déjà à la racine)
  server: {
    open: true, // ouvre automatiquement dans le navigateur
  },
  build: {
    outDir: "dist",
    build: {
      rollupOptions: {
        input: {
          // Landing page
          main: "index.html",
        },
      },
    }, // dossier de sortie après build
  },
  resolve: {
    alias: {
      "@function": path.resolve(__dirname, "/javascript/function"), // ex: @/style/css/index.css
      "@styleCSS": path.resolve(__dirname, "/src/style/CSS"), // ex: @/style/css/index.css
      "@styleSCSS": path.resolve(__dirname, "/src/style/SCSS"), // ex: @/style/css/index.css
      "@typo": path.resolve(__dirname, "/src/style/typographie"), // ex: @/style/css/index.css
      "@icon": path.resolve(__dirname, "/images/icon-location.svg"), // ex: @/style/css/index.css
    },
  },
});

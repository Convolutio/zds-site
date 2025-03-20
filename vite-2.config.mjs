import { defineConfig } from "vite";
import Spritesmith from 'vite-plugin-spritesmith';
import autoprefixer from "autoprefixer";
import cssnanoPlugin from "cssnano";

export default defineConfig({
    root: '.',
    build: {
      outDir: './dist',
      assetsDir: '.',
      sourcemap: true,
      emptyOutDir: true, // TODO: remove when Gulp is needed
      rollupOptions: {
        input: {
          main: "./vite-src/main.js",
          zmd: "./vite-src/main_zmd.js"
        },
        output: {
            assetFileNames: (assetInfo) => {
              // Extract the subdirectory structure from the source path
              const assetPath = assetInfo.originalFileNames[0] || '';
              const parts = assetPath.split('/'); // Split into path parts

              // Ensure we're handling files inside "assets/"
              if (parts[0] === "assets") {
                const subDir = parts.slice(1, parts.length-1).join("/"); // Get subdirectory
                return `${subDir}/[name][extname]`; // Organize assets in subfolders
              }
              const assetName = assetInfo.names[0] || '';
              if (assetName.endsWith(".css"))
                return "css/[name][extname]"

              // Default fallback if no subdirectory found
              return 'assets/[name][extname]';
            }
        }
      }
    },
    plugins: [
      Spritesmith({
      watch: true,
      src: {
        cwd: ".",
        glob: "./assets/images/sprite/*.png",
      },
      target: {
        image: './assets/images/sprite.png', // TODO: place this in an intermediary path
        css : [
          [
            "./assets/scss/_sprite.scss",
            {
              format: 'handlebars_based_template',
            },
          ]
        ]
      },
      retina: "@2x",
      apiOptions: {
        cssImageRef: '/images/sprite.png', // TODO: change this path
        spritesheet_info: {
          name: 'vite1',
          format: 'handlebars_based_template_retina',
        },
      },
      customTemplates: {
        handlebars_based_template_retina: './assets/scss/_sprite.scss.hbs',
      }
    })
    ],
    css: {
        devSourcemap: true,
        preprocessorOptions: {
          scss: {
            sourceMap: true,
          }
        },
        postcss: {
            plugins: [
                autoprefixer,
                cssnanoPlugin
            ]
        }
    }
});

import { defineConfig } from "vite";
import path from "path";
import glob from "glob";
import Spritesmith from 'vite-plugin-spritesmith';

const SPRITESMITH_OUTPUT_SCSS_DIR = 'vite-src/assets/scss';

export default defineConfig({
    root: '.',
    build: {
      outDir: './dist',
      assetsDir: '.',
      emptyOutDir: false,
      rollupOptions: {
      input: { a: 'vite-src/main.js' }
        // input: glob.sync(path.resolve(__dirname, SPRITESMITH_OUTPUT_SCSS_DIR)) // TODO: register each input directory
      }
    },
    resolve: {
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
        preprocessorOptions: {
          scss: {
            sourceMap: true,
          }
        },
        postcss: {
            plugins: [
                require("autoprefixer"),
                require("cssnano")
            ]
        }
    }
});

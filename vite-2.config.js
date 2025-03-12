import { defineConfig } from "vite";
import path from "path";
import Spritesmith from 'vite-plugin-spritesmith';

export default defineConfig({
    root: 'vite-src',
    build: {
      outDir: '../dist'
    },
    resolve: {
      alias: {
        '@templated-styles': path.resolve(__dirname, 'assets/scss')
      },
    },
    plugins: [
      Spritesmith({
      watch: true,
      src: {
        cwd: ".",
        glob: "./assets/images/sprite/*.png",
      },
      target: {
        image: './dist/images/sprite.png', // TODO: place this in an intermediary path
        css : [
          [
            './assets/scss/_sprite.scss',
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
                sourceMap: true
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

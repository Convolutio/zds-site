import { defineConfig } from "vite";
import path from "path";
import Spritesmith from 'vite-plugin-spritesmith';

export default defineConfig({
    root: "vite-src",
    resolve: {
        alias: {
          '@templated-styles': path.resolve(__dirname, 'assets/scss')
        }
    },
    build: {
        outDir: "../dist",
        //emptyOutDir: true; /* TODO : décommenter une fois Gulp retiré */
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "vite-src/main.js"),
                zmd: path.resolve(__dirname, "vite-src/main_zmd.js")
            },
            output: {
                entryFileNames: "[name].js",
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.endsWith(".css")) {
                        return "css/[name][extname]";
                    }
                    return "assets/[name][extname]";
                }
            }
        },
        cssCodeSplit: true
    },
    plugins: [
      Spritesmith({
      watch: true,
      src: {
        cwd: "./assets/images/sprite",
        glob: "*.png",
      },
      target: {
        image: './assets/images/sprite.png',
        css : [
          [
            './assets/scss/_sprite.scss',
            {
              format: 'handlebars_based_template_retina',
            },
          ]
        ]
      },
      retina: "@2x.png",
      apiOptions: {
        cssImageRef: '/assets/images/sprite.png',
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

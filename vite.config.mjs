import { defineConfig } from "vite";
import Spritesmith from 'vite-plugin-spritesmith';
import autoprefixer from "autoprefixer";
import cssnanoPlugin from "cssnano";
import viteImageMin from "vite-plugin-imagemin";

const NAME_MAP = {
  // Load all the images in the assets
  picture: "vite-src/pictures.html",

  "js/script": "vite-src/script.js",
  // Generates CSS for the website and the ebooks
  main: "vite-src/main__css.js",
  zmd: "vite-src/main_zmd__css.js",
  /* Get CSS minified files from packages
  * Get also sourcemaps for all CSS files, required by Django's ManifestStaticFilesStorage since 4.1 (see
  * https://docs.djangoproject.com/fr/4.2/ref/contrib/staticfiles/#manifeststaticfilesstorage) */
  "all.min": "vite-src/fontawesome__css.js",
  // Prepares files for zmarkdown
  "katex.min": "vite-src/zmarkdown__css.js",
  // Generates CSS for the static error pages in the folder `errors/`
  "errors.main": "vite-src/errors__css.js",
  // Prepares files for easy mde
  "easymde.min": "vite-src/easymde__css.js",
  // Get text fonts files from packages
  fontsource: "vite-src/fontsource.js"
}
const reversed_map = Object.entries(NAME_MAP).reduce((acc, pair) => ({...acc, [pair[1]]: pair[0]}), {});

const outputHandling = {
  process_lib_assets : (originalFileName, assetName) => {
    // Get text fonts files from packages
    if (originalFileName.startsWith('node_modules/@fontsource')) {
      return `css/files/[name][extname]`;
    }
    // Get icon fonts files from packages
    if (originalFileName.startsWith('node_modules/@fortawesome/fontawesome-free/webfonts')) {
      return `webfonts/[name][extname]`;
    }
    // Prepares files for zmarkdown
    if (originalFileName.startsWith('zmd/node_modules/katex/dist/fonts')) {
      return 'css/fonts/[name][extname]'
    }
    return false;
  },

  process_source_assets : (originalFileName, assetName) => {
    // Keep the same directory structure as in the assets directory
    const parts = originalFileName.split('/');
    if (parts[0] === "assets") {
      const subDir = parts.slice(1, parts.length-1).join("/");
      return `${subDir}/[name][extname]`;
    }
    return false;
  },

  process_css : (originalFileName, assetName) => {
    // Custom css output must be defined as in the NAME_MAP
    if (assetName.endsWith("css")) {
      if (originalFileName.endsWith("errors__css.js"))
        // TODO: put this file in the correct erros directory
        return `css/errors[extname]`;
      const name = reversed_map[originalFileName];
      return `css/${name}[extname]`;
    }
    return false;
  },
}

export default defineConfig({
    root: '.',
    build: {
      outDir: './dist',
      assetsDir: '.',
      sourcemap: true,
      emptyOutDir: true, // TODO: remove when Gulp is needed
      rollupOptions: {
        input: NAME_MAP,
        output: {
            assetFileNames: (assetInfo) => {
              // Extract the subdirectory structure from the source path
              const assetPath = assetInfo.originalFileNames[0] || '';
              const assetName = assetInfo.names[0] || '';

              for (const k of Object.keys(outputHandling)) {
                 const fn = outputHandling[k];
                 const result = fn(assetPath, assetName);
                 if (result !== false) return result;
              }

              // Default fallback if no subdirectory found
              return 'assets/[name][extname]';
            },
            entryFileNames: (entryInfo) => {
              // Remove hash
              if (entryInfo.name.startsWith("js/"))
                return '[name].js';
              return '[name]-[hash].js';
            }
        }
      },
      cssCodeSplit: true,
      assetsInlineLimit: 0
    },
    plugins: [
      Spritesmith({
      watch: true,
      src: {
        cwd: ".",
        glob: "./assets/images/sprite/*.png",
      },
      target: {
        image: './assets/images/sprite.png',
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
        cssImageRef: '/images/sprite.png',
        spritesheet_info: {
          name: 'vite1',
          format: 'handlebars_based_template_retina',
        },
      },
      customTemplates: {
        handlebars_based_template_retina: './assets/scss/_sprite.scss.hbs',
      }
    }),
    viteImageMin({
      gifsicle: {},
      mozjpeg: {},
      optipng: {},
      svgo: {
        plugins: [
          {
            // Avoid over-optimizing svg animations
            name: 'removeHiddenElems',
            active: false
          }
        ]
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

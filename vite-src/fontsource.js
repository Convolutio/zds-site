const fonts = import.meta.glob('../node_modules/fontsource/{source-sans-pro,source-code-pro,merriweather}/files/*', {
  eager: true, // This ensures that all images are imported eagerly (without waiting)
});

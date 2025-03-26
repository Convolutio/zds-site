import "@fortawesome/fontawesome-free/css/all.min.css";
const fonts = import.meta.glob('../node_modules/fortawesome/fontawesome-free/webfonts/*', {
  eager: true, // This ensures that all images are imported eagerly (without waiting)
});

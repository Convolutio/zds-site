import '../zmd/node_modules/katex/dist/katex.min.css';
const fonts = import.meta.glob('../zmd/node_modules/katex/dist/fonts/*', {
  eager: true, // This ensures that all images are imported eagerly (without waiting)
});

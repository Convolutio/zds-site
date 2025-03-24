// Dynamically import all images inside the 'assets/images' directory
const images = import.meta.glob('../assets/images/**/*', {
  eager: true, // This ensures that all images are imported eagerly (without waiting)
});

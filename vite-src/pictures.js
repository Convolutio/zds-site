// Dynamically import all images inside the 'assets/images' directory
const images = import.meta.glob(['../assets/images/**/*', '!../assets/images/sprite/*.png'], {
  eager: true, // This ensures that all images are imported eagerly (without waiting)
});

const smileys = import.meta.glob('../assets/smileys/**/*', {
  eager: true, // This ensures that all images are imported eagerly (without waiting)
});

const licenses = import.meta.glob('../assets/licenses/**/*', {
  eager: true, // This ensures that all images are imported eagerly (without waiting)
});

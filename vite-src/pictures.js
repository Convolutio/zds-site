// Dynamically import all images inside the 'assets/images' directory
// TODO: tell to vite that all of these assets must be loaded

const pngAssets = import.meta.glob([
  "../assets/images/**/*.png",
  "!../assets/images/sprite/*.png",
  "../assets/smileys/**/*.png",
  "../assets/licenses/**/*.png",
], { eager: true });

const svgAssets = import.meta.glob([
  "../assets/images/**/*.svg",
  "!../assets/images/sprite/*.svg",
  "../assets/smileys/**/*.svg",
  "../assets/licenses/**/*.svg",
], { eager: true });

const gifAssets = import.meta.glob([
  "../assets/images/**/*.gif",
  "!../assets/images/sprite/*.gif",
  "../assets/smileys/**/*.gif",
  "../assets/licenses/**/*.gif",
]);

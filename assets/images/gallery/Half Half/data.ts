import aboveView from "./Above view.webp";
import batmanVsSuperman from "./batman v superman gallery.webp";
import prettyFierce from "./Pretty Fierce.webp";
import sweetAndSinister from "./Sweet & Sinister.webp";

const createDesign = (id: string, title: string, image: typeof aboveView) => ({
  id,
  title,
  subtitle: "",
  alt: `${title} mouthguard`,
  tag: "",
  categoryId: "half-and-half",
  image,
  featured: false,
  size: "small",
});

const designs = [
  createDesign("half-and-half-above-view", "Above view", aboveView),
  createDesign(
    "half-and-half-batman-v-superman",
    "batman v superman gallery",
    batmanVsSuperman,
  ),
  createDesign("half-and-half-pretty-fierce", "Pretty Fierce", prettyFierce),
  createDesign(
    "half-and-half-sweet-and-sinister",
    "Sweet & Sinister",
    sweetAndSinister,
  ),
];

export default designs.sort((a, b) => a.title.localeCompare(b.title));


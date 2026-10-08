import batmanVsSuperman from "./Batman v Superman.webp";
import prettyFierce from "./Pretty Fierce.webp";
import sweetAndSinister from "./Sweet & Sinister.webp";

const createDesign = (id: string, title: string, image: typeof batmanVsSuperman) => ({
  id,
  title,
  subtitle: "",
  alt: `${title} mouthguard`,
  tag: `${title} mouthguard`,
  categoryId: "half-and-half",
  image,
  featured: false,
  size: "small",
});

const designs = [
  createDesign(
    "half-and-half-batman-v-superman",
    "batman vs superman",
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

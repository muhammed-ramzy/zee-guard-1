import img1 from "./1.webp";
import img2 from "./2.webp";


const designs = [
  {
    id: "al-ahly-1",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "al-ahly",
    image: img1,
    featured: false,
    size: "small",
  },
  {
    id: "al-ahly-2",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "al-ahly",
    image: img2,
    featured: false,
    size: "small",
  },
];

export default designs
  .map((design) => ({
    ...design,
    tag: `${design.title || design.id} mouthguard`,
  }))
  .sort((a, b) => a.title.localeCompare(b.title));

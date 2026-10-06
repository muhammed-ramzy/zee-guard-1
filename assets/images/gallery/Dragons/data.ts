import dragonsOne from "./Dragons1.webp";
import dragonsTwo from "./Dragons2.webp";
import dragonsThree from "./Dragons3.webp";
import dragonsWrath from "./Dragon's Wrath.webp";

const createDesign = (id: string, title: string, image: typeof dragonsOne) => ({
  id,
  title,
  subtitle: "",
  alt: `${title} mouthguard`,
  tag: "",
  categoryId: "dragons",
  image,
  featured: false,
  size: "small",
});

const designs = [
  createDesign("dragons-1", "Dragons #1", dragonsOne),
  createDesign("dragons-2", "Dragons #2", dragonsTwo),
  createDesign("dragons-3", "Dragons #3", dragonsThree),
  createDesign("dragons-wrath", "Dragon's Wrath", dragonsWrath),
];

export default designs.sort((a, b) => a.title.localeCompare(b.title));


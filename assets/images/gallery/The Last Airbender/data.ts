import fireNation from "./Fire Nation.webp";
import firePrince from "./Fire Prince.webp";
import fireVsWaterOne from "./Fire vs Water1.webp";
import fireVsWaterTwo from "./Fire vs Water2.webp";
import waterTribe from "./Water Tribe.webp";

const createDesign = (id: string, title: string, image: typeof fireNation) => ({
  id,
  title,
  subtitle: "",
  alt: `${title} mouthguard`,
  tag: "",
  categoryId: "the-last-airbender",
  image,
  featured: false,
  size: "small",
});

const designs = [
  createDesign("the-last-airbender-fire-nation", "Fire Nation", fireNation),
  createDesign("the-last-airbender-fire-prince", "Fire Prince", firePrince),
  createDesign(
    "the-last-airbender-fire-vs-water-1",
    "Fire vs Water 1",
    fireVsWaterOne,
  ),
  createDesign(
    "the-last-airbender-fire-vs-water-2",
    "Fire vs Water 2",
    fireVsWaterTwo,
  ),
  createDesign("the-last-airbender-water-tribe", "Water Tribe", waterTribe),
];

export default designs;

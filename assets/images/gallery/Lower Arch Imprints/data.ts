import imprintsBlack from "./Imprints Black.webp";
import imprintsBlue from "./Imprints Blue.webp";
import imprintsWhite from "./Imprints White.webp";
import imprintsInAction from "./Imprints in action.webp";

const createDesign = (id: string, title: string, image: typeof imprintsBlack) => ({
  id,
  title,
  subtitle: "",
  alt: `${title} lower arch imprints`,
  tag: `${title} lower arch imprints`,
  categoryId: "lower-arch-imprints",
  image,
  featured: false,
  size: "small",
});

const designs = [
  createDesign("lower-arch-imprints-black", "Imprints Black", imprintsBlack),
  createDesign("lower-arch-imprints-blue", "Imprints Blue", imprintsBlue),
  createDesign(
    "lower-arch-imprints-white",
    "Imprints White",
    imprintsWhite,
  ),
  createDesign(
    "lower-arch-imprints-in-action",
    "Imprints in Action",
    imprintsInAction,
  ),
];

export default designs.sort((a, b) => a.title.localeCompare(b.title));

import angola from "./ANGOLA.webp";
import belgium from "./BELGIUM.webp";
import egyptOne from "./EGYPT1.webp";
import egyptTwo from "./EGYPT2.webp";
import egyptThree from "./EGYPT3.webp";
import egyptFour from "./EGYPT4.webp";
import jordan from "./JORDAN.webp";
import ksaOne from "./KSA1.webp";
import ksaTwo from "./KSA2.webp";
import libyaOne from "./LIBYA1.webp";
import libyaTwo from "./LIBYA2.webp";
import qatar from "./QATAR.webp";

const createDesign = (id: string, title: string, image: typeof angola) => ({
  id,
  title,
  subtitle: "",
  alt: `${title} mouthguard`,
  tag: "",
  categoryId: "flags",
  image,
  featured: false,
  size: "small",
});

const designs = [
  createDesign("flags-angola", "Angola", angola),
  createDesign("flags-belgium", "Belgium", belgium),
  createDesign("flags-egypt-1", "Egypt 1", egyptOne),
  createDesign("flags-egypt-2", "Egypt 2", egyptTwo),
  createDesign("flags-egypt-3", "Egypt 3", egyptThree),
  createDesign("flags-egypt-4", "Egypt 4", egyptFour),
  createDesign("flags-jordan", "Jordan", jordan),
  createDesign("flags-ksa-1", "KSA 1", ksaOne),
  createDesign("flags-ksa-2", "KSA 2", ksaTwo),
  createDesign("flags-libya-1", "Libya 1", libyaOne),
  createDesign("flags-libya-2", "Libya 2", libyaTwo),
  createDesign("flags-qatar", "Qatar", qatar),
];

export default designs;

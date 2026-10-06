import img1 from "./1.webp";
import img2 from "./2.webp";
import img3 from "./3.webp";
import img4 from "./4.webp";
import img5 from "./5.webp";
import img6 from "./6.webp";
import img7 from "./7.webp";
import img8 from "./8.webp";


const designs = [
  {
    id: "reflective-gold-1",
    title: "Sasa",
    subtitle: "Golden teeth",
    tag: "Kick-boxing",
    categoryId: "reflective-gold",
    image: img1,
    featured: false,
    size: "small",
  },
  {
    id: "reflective-gold-2",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "reflective-gold",
    image: img2,
    featured: false,
    size: "small",
  },
  {
    id: "reflective-gold-3",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "reflective-gold",
    image: img3,
    featured: false,
    size: "small",
  },
  {
    id: "reflective-gold-4",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "reflective-gold",
    image: img4,
    featured: false,
    size: "small",
  },
  {
    id: "reflective-gold-5",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "reflective-gold",
    image: img5,
    featured: false,
    size: "small",
  },
  {
    id: "reflective-gold-6",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "reflective-gold",
    image: img6,
    featured: false,
    size: "small",
  },
  {
    id: "reflective-gold-7",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "reflective-gold",
    image: img7,
    featured: false,
    size: "small",
  },
  {
    id: "reflective-gold-8",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "reflective-gold",
    image: img8,
    featured: false,
    size: "small",
  },
];

export default designs.sort((a, b) => a.title.localeCompare(b.title));

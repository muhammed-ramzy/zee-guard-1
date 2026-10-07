import img1 from "./1.webp";
import img2 from "./2.webp";
import img3 from "./3.webp";
import img4 from "./4.webp";
import img5 from "./5.webp";
import img6 from "./6.webp";
import img7 from "./7.webp";
import img8 from "./8.webp";
import img9 from "./9.webp";
import img10 from "./10.webp";
import img11 from "./11.webp";
import img12 from "./12.webp";


const designs = [
  {
    id: "fangs-and-teeth-1",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "fangs-and-teeth",
    image: img1,
    featured: false,
    size: "small",
  },
  {
    id: "fangs-and-teeth-2",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "fangs-and-teeth",
    image: img2,
    featured: false,
    size: "small",
  },
  {
    id: "fangs-and-teeth-3",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "fangs-and-teeth",
    image: img3,
    featured: false,
    size: "small",
  },
  {
    id: "fangs-and-teeth-4",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "fangs-and-teeth",
    image: img4,
    featured: false,
    size: "small",
  },
  {
    id: "fangs-and-teeth-5",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "fangs-and-teeth",
    image: img5,
    featured: false,
    size: "small",
  },
  {
    id: "fangs-and-teeth-6",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "fangs-and-teeth",
    image: img6,
    featured: false,
    size: "small",
  },
  {
    id: "fangs-and-teeth-7",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "fangs-and-teeth",
    image: img7,
    featured: false,
    size: "small",
  },
  {
    id: "fangs-and-teeth-8",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "fangs-and-teeth",
    image: img8,
    featured: false,
    size: "small",
  },
  {
    id: "fangs-and-teeth-9",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "fangs-and-teeth",
    image: img9,
    featured: false,
    size: "small",
  },
  {
    id: "fangs-and-teeth-10",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "fangs-and-teeth",
    image: img10,
    featured: false,
    size: "small",
  },
  {
    id: "fangs-and-teeth-11",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "fangs-and-teeth",
    image: img11,
    featured: false,
    size: "small",
  },
  {
    id: "fangs-and-teeth-12",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "fangs-and-teeth",
    image: img12,
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

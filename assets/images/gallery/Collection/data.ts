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
import img13 from "./13.webp";
import img14 from "./14.webp";
import img15 from "./15.webp";
import img16 from "./16.webp";
import img17 from "./17.webp";
import img18 from "./18.webp";
import img19 from "./19.webp";
import img20 from "./20.webp";


const designs = [
  {
    id: "collection-1",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img1,
    featured: false,
    size: "small",
  },
  {
    id: "collection-2",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img2,
    featured: false,
    size: "small",
  },
  {
    id: "collection-3",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img3,
    featured: false,
    size: "small",
  },
  {
    id: "collection-4",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img4,
    featured: false,
    size: "small",
  },
  {
    id: "collection-5",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img5,
    featured: false,
    size: "small",
  },
  {
    id: "collection-6",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img6,
    featured: false,
    size: "small",
  },
  {
    id: "collection-7",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img7,
    featured: false,
    size: "small",
  },
  {
    id: "collection-8",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img8,
    featured: false,
    size: "small",
  },
  {
    id: "collection-9",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img9,
    featured: false,
    size: "small",
  },
  {
    id: "collection-10",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img10,
    featured: false,
    size: "small",
  },
  {
    id: "collection-11",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img11,
    featured: false,
    size: "small",
  },
  {
    id: "collection-12",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img12,
    featured: false,
    size: "small",
  },
  {
    id: "collection-13",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img13,
    featured: false,
    size: "small",
  },
  {
    id: "collection-14",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img14,
    featured: false,
    size: "small",
  },
  {
    id: "collection-15",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img15,
    featured: false,
    size: "small",
  },
  {
    id: "collection-16",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img16,
    featured: false,
    size: "small",
  },
  {
    id: "collection-17",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img17,
    featured: false,
    size: "small",
  },
  {
    id: "collection-18",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img18,
    featured: false,
    size: "small",
  },
  {
    id: "collection-19",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img19,
    featured: false,
    size: "small",
  },
  {
    id: "collection-20",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "collection",
    image: img20,
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
import img1 from "./1.webp";
import img2 from "./2.webp";
import img3 from "./3.webp";


const designs = [
  {
    id: "pharaonic-1",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "pharaonic",
    image: img1,
    featured: false,
    size: "small",
  },
  {
    id: "pharaonic-2",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "pharaonic",
    image: img2,
    featured: false,
    size: "small",
  },
  {
    id: "pharaonic-3",
    title: "",
    subtitle: "",
    tag: "",
    categoryId: "pharaonic",
    image: img3,
    featured: false,
    size: "small",
  },
];

export default designs.sort((a, b) => a.title.localeCompare(b.title));

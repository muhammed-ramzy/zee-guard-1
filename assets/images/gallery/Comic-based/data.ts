import batmanVsSuperman from "./batman v superman.webp";
import devilOfHellKitchen from "./Devil of Hell's Kitchen.webp";
import doctorStrange from "./Dr. Strange Sorcerer Supreme.webp";
import friendlyNeighborhoodSpidey from "./Friendly Neighborhood Spidey.webp";
import hulkSmash from "./Hulk Smash.webp";
import phoenixForce from "./Phoenix Force.webp";
import darkKnight from "./The Dark Knight.webp";
import venomOne from "./Venom1.webp";
import venomTwo from "./Venom2.webp";
import venomThree from "./Venom3.webp";
import whySoSerious from "./WhySoSerious.webp";
import symbioticIdentity from "./Symbiotic Identity.webp";

const createDesign = (id: string, title: string, image: typeof whySoSerious) => ({
  id,
  title,
  subtitle: "",
  alt: `${title} mouthguard`,
  tag: `${title} mouthguard`,
  categoryId: "comic-based",
  image,
  featured: false,
  size: "normal",
});

const designs = [
  createDesign(
    "comic-based-batman-v-superman",
    "batman v superman",
    batmanVsSuperman,
  ),
  createDesign(
    "comic-based-devil-of-hells-kitchen",
    "Devil of Hell's Kitchen",
    devilOfHellKitchen,
  ),
  createDesign(
    "comic-based-doctor-strange",
    "Dr. Strange Sorcerer Supreme",
    doctorStrange,
  ),
  createDesign(
    "comic-based-friendly-neighborhood-spidey",
    "Friendly Neighborhood Spidey",
    friendlyNeighborhoodSpidey,
  ),
  createDesign("comic-based-hulk-smash", "Hulk Smash", hulkSmash),
  createDesign("comic-based-phoenix-force", "Phoenix Force", phoenixForce),
  createDesign("comic-based-dark-knight", "The Dark Knight", darkKnight),
  createDesign("comic-based-venom-1", "Venom #1", venomOne),
  createDesign("comic-based-venom-2", "Venom #2", venomTwo),
  createDesign("comic-based-venom-3", "Venom #3", venomThree),
  createDesign("comic-based-why-so-serious", "Why So Serious", whySoSerious),
  createDesign("comic-based-symbioticss-identity", "Symbiotic Identity", symbioticIdentity),
];

export default designs.sort((a, b) => a.title.localeCompare(b.title));

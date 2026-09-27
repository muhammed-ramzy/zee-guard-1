// app/fonts.tsx
import { Oswald, Inter, Lato, Limelight, Playfair_Display, Dancing_Script } from "next/font/google";
import localFont from "next/font/local";

export const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: '--font-oswald',
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-inter',
});

export const lato = Lato({
  subsets: ["latin"],
  weight: "700",
  variable: '--font-lato',
});

export const copperplate = localFont({
  src: "/fonts/Copperplate Gothic bold.otf",
  weight: "400",
  variable: "--font-copperplate",
  display: "swap",
});

export const limelight = Limelight({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-limelight',
});

export const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-playfair',
});

export const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-dancing',
});

export const impact = { 
  variable: '--font-impact',
};

// Map font names directly to CSS variables
export const FONT_FAMILIES = [
  { name: "Impact", value: "Impact, sans-serif", family: "Impact" },
  { name: "College Block", value: "var(--font-limelight), Limelight, cursive", family: "Limelight" },
  { name: "American Captain", value: "var(--font-oswald), Oswald, sans-serif", family: "Oswald" },
  { name: "Corporate Gothic", value: "var(--font-playfair), 'Playfair Display', serif", family: "Playfair Display" },
  { name: "Playlist Script", value: "var(--font-dancing), 'Dancing Script', cursive", family: "Dancing Script" },
];

export const fontVariables = [
  oswald.variable,
  inter.variable,
  lato.variable,
  copperplate.variable,
  limelight.variable,
  playfair.variable,
  dancingScript.variable,
].join(' ');
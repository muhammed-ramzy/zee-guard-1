import { StaticImageData } from "next/image";

export interface NavLink {
  label: string;
  href: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface StatItem {
  value: number;
  label: string;
  isPercent?: boolean;
}

export interface DesignCategory {
  id: string;
  label: string;
}

export interface GalleryDesign {
  id: string;
  title: string;
  subtitle: string;
  tag?: string;
  categoryId: string;
  image: string | StaticImageData;
  featured?: boolean;
  size?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  badge?: string;
}

export interface ComparisonRow {
  feature: string;
  traditional: string;
  zeeguard: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  imageUrl?: StaticImageData;
  rating?: number;
  verified?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TierOption {
  name: string;
  price: number;
  spec: string;
  recommended: string;
  hasColorPicker?: boolean;
}

export interface PricingTier {
  id: string;
  badge: string;
  badgeVariant: "essential" | "popular" | "pro";
  name: string;
  description: string;
  hasColorPicker?: boolean;
  options: TierOption[];
  ctaLabel: string;
  ctaVariant: "solid" | "outline-gold" | "outline-white";
}

export interface AddOns {
  lowerFit: AddOnOption,
  flavour?: AddOnOption,
}

export interface AddOnOption
{
  description: string,
  price: number
}

export interface AddOnChoice
{
  key: string,
  addOnOption: AddOnOption
}

export interface choice{
    optionName: string,
    optionPrice: number,
    thickness: string,
    addOns: AddOnChoice[]
}

export interface Athlete {
  name: string;
  discipline: string;
  achievements: string[];
  quote: string;
  imageQuery: string;
  img: StaticImageData
}

export interface ContactMethod {
  icon: fontIcon;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
}

export interface LabLocation {
  name: string;
  address: string[];
}
export interface Socials  {
   label: string;
  icon: fontIcon;
  href: string;
  color: string;
}

export type fontIcon = "facebook" | "whatsapp" | "instagram";


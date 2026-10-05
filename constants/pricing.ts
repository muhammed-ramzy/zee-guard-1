import { PricingTier, TierOption, AddOns } from "@/types";

export const CORE_TIERS: PricingTier[] = [
  {
    id: "corefit",
    badge: "ESSENTIAL",
    badgeVariant: "essential",
    name: "ZeeGuard CoreFit",
    description: "Affordable, plain category",
    hasColorPicker: true,
    ctaLabel: "Get Yours Now",
    ctaVariant: "solid",
    options: [
      {
        name: "CoreFit - Junior",
        price: 500,
        spec: "1 Layer • 3mm • Clear",
        recommended: "Recommended: Age group <13",
      },
      {
        name: "CoreFit - Essential #1",
        price: 800,
        spec: "2 Layers • ~4mm • Clear",
        recommended: "Recommended: Football, Basketball, Karate, Taekwondo, Kung Fu",
      },
      {
        name: "CoreFit - Essential #2",
        price: 1000,
        spec: "2 Layers • ~4mm • Colored",
        recommended: "Recommended: Football, Basketball, Karate, Taekwondo, Kung Fu",
        hasColorPicker: true,
      },
    ],
  },
  {
    id: "designflex",
    badge: "MOST POPULAR",
    badgeVariant: "popular",
    name: "ZeeGuard Elite",
    description: "Custom design series",
    ctaLabel: "Customize This Model",
    ctaVariant: "solid",
    options: [
      {
        name: "Elite - Essential",
        price: 1000,
        spec: "2 Layers • ~4mm • Clear",
        recommended: "Recommended: Football, Basketball, Karate, Taekwondo, Kung Fu",
      },
      {
        name: "Elite - Advanced",
        price: 1400,
        spec: "2 Layers • ~5mm • Colored/Clear",
        recommended: "Recommended: Karate, Taekwondo, BJJ, Kung Fu",
      },
      {
        name: "Elite - Ultimate",
        price: 1600,
        spec: "3 Layers • ~6mm • Colored/Clear",
        recommended: "Recommended: MMA, Muay thai, Boxing, Kickboxing, Sanda",
      },
    ],
  },
  {
    id: "fusion",
    badge: "PRO GRADE",
    badgeVariant: "pro",
    name: "ZeeGuard Fusion",
    description: "Premium dual-color series.",
    ctaLabel: "Customize This Model",
    ctaVariant: "outline-gold",
    options: [
      {
        name: "Fusion - Advanced",
        price: 1600,
        spec: "2 Layers • ~5mm • Colored/Clear",
        recommended: "Recommended: Karate, Taekwondo, BJJ, Kung Fu",
      },
      {
        name: "Fusion - Ultimate",
        price: 1800,
        spec: "3 Layers • ~6mm • Colored/Clear",
        recommended: "Recommended: MMA, Muay thai, Boxing, Kickboxing, Sanda",
      },
    ],
  },
];

export const ADD_ONS: AddOns = {
  lowerFit: {
    description: "Imprints for Lower teeth ensuring maximum stability and comfort",
    price: 500,
  },
};

export const AVAILABLE_COLORS = ["Black", "White", "Blue", "Pink", "Green"];

export const UPPER_JAW_OPTIONS: TierOption[] = [
  {
    name: "Elite - Essential",
    price: 1000,
    spec: "2 Layers • ~4mm • Clear",
    recommended: "Recommended: Football, Basketball, Karate, Taekwondo, Kung Fu",
  },
  {
    name: "Elite - Advanced",
    price: 1400,
    spec: "2 Layers • ~5mm • Colored/Clear",
    recommended: "Recommended: Karate, Taekwondo, BJJ, Kung Fu",
  },
  {
    name: "Elite - Ultimate",
    price: 1600,
    spec: "3 Layers • ~6mm • Colored/Clear",
    recommended: "Recommended: MMA, Muay thai, Boxing, Kickboxing, Sanda",
  },
];

export const LOWER_JAW_OPTIONS: TierOption[] = [
  {
    name: "CoreFit",
    price: 500,
    spec: "1 Layer • 3mm • Clear",
    recommended: "",
  },
  {
    name: "CoreFit colored",
    price: 700,
    spec: "1 Layer • 3mm • Colored",
    recommended: "",
  },
];

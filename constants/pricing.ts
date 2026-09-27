import { PricingTier, TierOption, AddOns } from "@/types";

export const CORE_TIERS: PricingTier[] = [
  {
    id: "corefit",
    badge: "ESSENTIAL",
    badgeVariant: "essential",
    name: "ZeeGuard CoreFit",
    description: "Affordable protection-focused line.",
    hasColorPicker: true,
    ctaLabel: "Get Yours Now",
    ctaVariant: "solid",
    options: [
      {
        name: "CoreFit Basic",
        price: 400,
        spec: "3MM • TRANSPARENT",
        recommended:
          "RECOMMENDED: BASKETBALL, VOLLEYBALL, SKATEBOARDING, SOCCER",
      },
      {
        name: "CoreFit Shield",
        price: 600,
        spec: "4MM • TRANSPARENT",
        recommended:
          "RECOMMENDED: BASKETBALL, VOLLEYBALL, SKATEBOARDING, SOCCER",
      },
      {
        name: "CoreFit ColorShield",
        price: 800,
        spec: "4MM • TRANSPARENT",
        recommended:
          "RECOMMENDED: BASKETBALL, VOLLEYBALL, SKATEBOARDING, SOCCER",
        hasColorPicker: true,
      },
    ],
  },
  {
    id: "designflex",
    badge: "MOST POPULAR",
    badgeVariant: "popular",
    name: "ZeeGuard DesignFlex",
    description: "Premium dual-color series.",
    ctaLabel: "Customize This Model",
    ctaVariant: "solid",
    options: [
      {
        name: "DesignFlex Shield",
        price: 800,
        spec: "4MM • TRANSPARENT",
        recommended:
          "RECOMMENDED: BASKETBALL, VOLLEYBALL, SKATEBOARDING, SOCCER",
      },
      {
        name: "DesignFlex Strong",
        price: 1200,
        spec: "5MM • TRANS / COLORED",
        recommended:
          "RECOMMENDED: BASKETBALL, VOLLEYBALL, SKATEBOARDING, SOCCER",
      },
      {
        name: "DesignFlex Elite",
        price: 1400,
        spec: "6MM • TRANS / COLORED",
        recommended:
          "RECOMMENDED: BASKETBALL, VOLLEYBALL, SKATEBOARDING, SOCCER",
      },
    ],
  },
  {
    id: "fusion",
    badge: "PRO GRADE",
    badgeVariant: "pro",
    name: "ZeeGuard Fusion",
    description: "Custom design series.",
    ctaLabel: "Customize This Model",
    ctaVariant: "outline-gold",
    options: [
      {
        name: "Fusion Strong",
        price: 1400,
        spec: "5MM • COLORED",
        recommended:
          "RECOMMENDED: BASKETBALL, VOLLEYBALL, SKATEBOARDING, SOCCER",
      },
      {
        name: "Fusion Elite",
        price: 1600,
        spec: "6MM • COLORED",
        recommended:
          "RECOMMENDED: BASKETBALL, VOLLEYBALL, SKATEBOARDING, SOCCER",
      },
    ],
  },
];

export const ADD_ONS: AddOns = {
  lowerFit: {
    description: "Custom-fit lower tray for dual-arch protection",
    price: 500,
  },
};

export const AVAILABLE_COLORS = ["Black", "White", "Blue", "Pink", "Green"];

export const UPPER_JAW_OPTIONS: TierOption[] = [
  {
    name: "Elite - Essential",
    price: 900,
    spec: "4MM • TRANSPARENT",
    recommended: "RECOMMENDED: BASKETBALL, VOLLEYBALL, SKATEBOARDING, SOCCER",
  },
  {
    name: "Elite - Advanced",
    price: 1300,
    spec: "5MM • COLORED OR TRANSPARENT",
    recommended: "RECOMMENDED: BASKETBALL, VOLLEYBALL, SKATEBOARDING, SOCCER",
  },
  {
    name: "Elite - Ultimate",
    price: 1500,
    spec: "6MM • COLORED OR TRANSPARENT",
    recommended: "RECOMMENDED: BASKETBALL, VOLLEYBALL, SKATEBOARDING, SOCCER",
  },
];

export const LOWER_JAW_OPTIONS: TierOption[] = [
  {
    name: "CoreFit",
    price: 500,
    spec: "3MM • TRANSPARENT",
    recommended: "RECOMMENDED: BASKETBALL, VOLLEYBALL, SKATEBOARDING, SOCCER",
  },
  {
    name: "CoreFit Colored",
    price: 700,
    spec: "3MM • COLORED",
    recommended: "RECOMMENDED: BASKETBALL, VOLLEYBALL, SKATEBOARDING, SOCCER",
  },
];

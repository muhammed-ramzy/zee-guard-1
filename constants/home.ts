import {
  FeatureItem,
  StatItem,
  ProcessStep,
  ComparisonRow,
  FaqItem,
} from "@/types";

export const HERO_BADGES: string[] = [
  "National Team Athletes",
  "Dentist Made",
  "Custom Fit",
  "Braces Friendly",
  "Better Breathing",
];

export const FEATURES: FeatureItem[] = [
  {
    icon: "Target",
    title: "Perfect Fit",
    description:
      "Custom molded to your exact dental impression, ensuring a secure fit with zero movement during every match.",
  },
  {
    icon: "Wind",
    title: "Better Breathing",
    description:
      "Less bulky compared to stock mouthguards allowing better breathing, helping you stay focused and perform at your highest level.",
  },
  {
    icon: "ShieldCheck",
    title: "Superior Protection",
    description:
      "Multi-layered EVA material diffuses impact forces away from vulnerable areas.",
  },
  {
    icon: "LockKeyhole",
    title: "Secure Retention",
    description:
      "Precision-fit design stays securely in place, keeping you focused through every round and every movement.",
  },
  {
    icon: "BriefcaseMedical",
    title: "Braces Friendly",
    description:
      "A special category designed for athletes with braces, providing dependable protection without compromising comfort or fit.",
  },
  {
    icon: "Brush",
    title: "Fully Customized",
    description:
      "Create a mouthguard that's uniquely yours with custom colors, graphics, logos, and personalized text.",
  },
];

export const TRUST_STATS: StatItem[] = [
  { value: 400, label: "Athletes" },
  { value: 15, label: "Countries" },
  { value: 50, label: "National Team" },
  { value: 50, label: "International Athletes" },
  { value: 6, label: "Martial Arts" },
];

export const PROCESS_STEPS_SHORT: { step: number; title: string; description: string }[] = [
  { step: 1, title: "Book", description: "Schedule your appointment" },
  { step: 2, title: "Impression", description: "We take your dental mold" },
  { step: 3, title: "Design", description: "Choose colors & graphics" },
  { step: 4, title: "Crafting", description: "Precision fabrication" },
  { step: 5, title: "Fitting", description: "Ensuring the perfect fit" },
  { step: 6, title: "Fight", description: "Protect your smile" },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: "Fit & Comfort", traditional: "Loose, bulky", zeeguard: "Perfect snap-in fit" },
  { feature: "Breathing & Speaking", traditional: "Difficult", zeeguard: "Clear & unobstructed" },
  { feature: "Impact Protection", traditional: "Minimal diffusion", zeeguard: "Advanced multi-layer" },
  { feature: "Durability", traditional: "Wears quickly", zeeguard: "Long-lasting materials" },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How long does it take to make a custom mouthguard?",
    answer:
      "From impression to delivery, most orders are ready within 5-7 business days. Rush fittings can be arranged for competitions on short notice — just message us on WhatsApp.",
  },
  {
    question: "Can I get a mouthguard if I wear braces?",
    answer:
      "Yes. Our Braces Protection Series is designed specifically for athletes with orthodontic appliances, with room built in to accommodate brackets and wires safely.",
  },
  {
    question: "How do I clean my mouthguard?",
    answer:
      "Rinse with cool water after every use, brush gently with a soft toothbrush, and store it in our special case. Avoid hot water, which can warp the custom fit.",
  },
];

export const PROCESS_STEPS_FULL: ProcessStep[] = [
  {
    step: 1,
    title: "Choose Design",
    description:
      "Access our 2D configurator to select base colors, upload logos, and define the visual identity of your guard.",
    icon: "Palette",
  },
  {
    step: 2,
    title: "Message ZeeGuard",
    description:
      "Submit your design intent. Our technicians will review the specifications for structural integrity and aesthetic viability.",
    icon: "MessagesSquare",
  },
  {
    step: 3,
    title: "Book Appointment",
    description:
      "Schedule a fitting at one of our clinics or arrange for a one of our dentists to visit your training facility.",
    icon: "CalendarCheck",
  },
  {
    step: 4,
    title: "Dental Impression",
    description:
      "High-fidelity impression capture. We utilize medical-grade alginate or 3D intraoral scanning for micron-level accuracy.",
    icon: "Smile",
    badge: "15 MINS",
  },
  {
    step: 5,
    title: "Manufacturing",
    description:
      "Thermoforming, pressure lamination, and meticulous hand-finishing in our specialized dental laboratory.",
    icon: "Cog",
    badge: "5-7 Days",
  },
  {
    step: 6,
    title: "Delivery",
    description:
      "Secure, insured shipment of your custom ZeeGuard, complete with protective case and care instructions.",
    icon: "Truck",
  },
];

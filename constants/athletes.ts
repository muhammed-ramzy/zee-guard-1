import { Athlete, StatItem, Testimonial } from "@/types";
import karamGaber from "@/assets/images/athletes/karam-gaber.webp";
import zyadElgharib from "@/assets/images/athletes/karam-gaber.webp";
import ali from "@/assets/images/athletes/karam-gaber.webp";
import hossam from "@/assets/images/athletes/karam-gaber.webp";


export const ATHLETE_STATS: StatItem[] = [
  { value: 15, label: "Senior National Champions" },
  { value: 6, label: "Junior National Champions" },
  { value: 100, label: "Professional Grade Rating", isPercent: true },
];

export const CHAMPIONS: Athlete[] = [
  {
    name: "karam gaber",
    discipline: "Karate",
    achievements: ["3x National Karate Champion", "Pan-Am Gold Medalist"],
    quote:
      "Breathing is everything in the final round. ZeeGuard gives me the oxygen I need while feeling like a concrete wall against impacts.",
    imageQuery: "male karate athlete national team portrait",
    img: karamGaber,
  },
  {
    name: "Zyad Elgharib",
    discipline: "Karate",
    achievements: ["3x National Karate Champion", "Pan-Am Gold Medalist"],
    quote:
      "Breathing is everything in the final round. ZeeGuard gives me the oxygen I need while feeling like a concrete wall against impacts.",
    imageQuery: "male karate athlete national team portrait",
    img: zyadElgharib,
  },
  {
    name: "Elias Vance",
    discipline: "Pro MMA",
    achievements: [
      "Current Light-Heavyweight Champ",
      "12-0 Undefeated Pro Record",
    ],
    quote:
      "I don't step into the cage without it. The custom fit locks in tight, and I don't even realize it's there until it takes a knee for me.",
    imageQuery: "male mma fighter karate gi portrait smiling",
    img: ali,
  },
  {
    name: "Ali hossam",
    discipline: "Boxing",
    achievements: ["2x Golden Gloves Winner", "Olympic Qualifier"],
    quote:
      "Communication with my corner is crucial. ZeeGuard's slim profile lets me speak clearly between rounds without removing it.",
    imageQuery: "female boxer portrait dreadlocks black and white",
    img: hossam
  },
];

export const ATHLETE_TESTIMONIALS: Testimonial[] = [
  {
    name: "@joshua_mma",
    role: "Amateur MMA Fighter",
    rating: 5,
    quote:
      "Got my custom mold in last week. Fitted perfectly on the first try. Took a solid upper cut in sparring yesterday and barely felt it in the jaw. Legit.",
  },
  {
    name: "Amanda R.",
    role: "Best Investment for BJJ",
    rating: 5,
    verified: true,
    quote:
      "I've gone through cheap boil-and-bites for years, always gagging or struggling to breathe while rolling. The ZeeGuard custom fit is night and day. It clicks into place, stays there, and I can actually drink water without popping it out. Worth every penny if you take your sport seriously.",
  },
  {
    name: "Mike T.",
    role: "Kickboxing Coach",
    rating: 4,
    quote:
      "The design process was awesome. Love the gold fangs I got added. Guard is super tough but low profile.",
  },
];

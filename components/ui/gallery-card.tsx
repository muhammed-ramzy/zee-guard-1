'use client'

import Image from "next/image";
import { cn } from "@/lib/utils";
import { GalleryDesign } from "@/types";
import {motion} from "motion/react"

interface GalleryCardProps {
  design: GalleryDesign;
  className?: string;
  imageHeightClass?: string;
}

export function GalleryCard({ design, className }: GalleryCardProps) {
  return (
    <motion.article
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-ink-850",
        className,
      )}
      initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.05,
            }}
    >
      <div className="absolute inset-0 bg-[#000000]" />
      <div className={cn("relative w-full", className)}>
        <Image
          src={design.image}
          alt={`${design.title} — custom mouthguard design, ${design.subtitle}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain transition-all duration-500 brightness-120 group-hover:brightness-140 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />
      </div>

      {design.tag && (
        <span className="absolute left-4 top-4 rounded-sm bg-gold-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink-950">
          {design.tag}
        </span>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-display text-xl uppercase tracking-wide text-white sm:text-2xl">
          {design.title}
        </h3>
        <p className="mt-1 text-sm text-steel-400">{design.subtitle}</p>
      </div>
    </motion.article>
  );
}

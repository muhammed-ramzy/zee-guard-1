"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { GalleryDesign } from "@/types";
import { motion } from "motion/react";

interface GalleryCardProps {
  design: GalleryDesign;
  className?: string;
  imageHeightClass?: string;
}

export function GalleryCard({ design, className }: GalleryCardProps) {
  return (
    <motion.article
      className={cn(
        "group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-ink-850",
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
      <div className="absolute inset-0">
        <Image
          src={design.image}
          alt={
            design.alt ??
            `${design.title} — custom mouthguard design, ${design.subtitle}`
          }
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain transition-all duration-500 brightness-120 group-hover:brightness-140 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/10 to-transparent" />
      </div>

      {design.tag && (
        <span className="absolute left-4 top-4 rounded-sm bg-gold-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink-950">
          {design.tag}
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-16 sm:px-5 sm:pb-5">
        {design.tag && (
          <div className="mb-2 flex items-center gap-2">
            <span className="h-px w-6 shrink-0 bg-gold-400" />
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-gold-300">
              {design.tag}
            </span>
          </div>
        )}
        {design.title && (
          <p className="max-w-full whitespace-nowrap font-display font-semibold uppercase leading-tight text-white sm:text-lg">
            {design.title}
          </p>
        )}
      </div>
    </motion.article>
  );
}
